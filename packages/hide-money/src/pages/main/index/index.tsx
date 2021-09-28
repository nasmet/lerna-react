/*
 * @Description: 主场景
 * @Author: 吴锦辉
 * @Date: 2021-09-27 09:23:20
 * @LastEditTime: 2021-09-28 17:49:43
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Taro, { useShareAppMessage, useRouter } from '@tarojs/taro';
import { View, ScrollView, Image, Input } from '@tarojs/components';
import sceneConfig from '@scene';
import cacheCtrl from '@cache';
import { CustomButton } from '@component';
import httpCtrl from '@api';
import iconClose from '@img/index/default/close.png';
import styles from './index.module.scss';

const { windowHeight = 603 } = cacheCtrl.getSystemInfo();

const scale = (windowHeight * 2) / sceneConfig.height;

export default function Index() {
  const { roomId } = useRouter().params;

  cacheCtrl.setMode(roomId ? 2 : 1);

  const [scrollLeft, setScrollLeft] = useState(0);
  const [showHideMoney, setShowHideMoney] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const scrollLeftCache = useRef(0);
  const closeItemAnimation = useRef<null | any>(null);
  const shareMoney = useRef(0);

  useEffect(() => {
    if (!roomId) {
      return;
    }

    /** 找钱 */
    Taro.showLoading({
      title: '',
      mask: true,
    });

    const [, excute]: Array<any> = httpCtrl.post('/room/info', {
      id: roomId,
    });

    excute.then(res => {
      cacheCtrl.setRoomInfo(res);

      Taro.hideLoading();
    });
  }, [roomId]);

  useEffect(() => {
    if (showHideMoney) {
      setScrollLeft(scrollLeftCache.current);
    }
  }, [showHideMoney]);

  const onShowHideMoney = useCallback(cb => {
    setShowHideMoney(true);

    closeItemAnimation.current = cb;
  }, []);

  const onCloseHideMoney = useCallback(flag => {
    setShowHideMoney(false);

    if (flag) {
      closeItemAnimation.current && closeItemAnimation.current();
    }
  }, []);

  const onShowShare = useCallback(money => {
    shareMoney.current = money;

    setShowShare(true);
  }, []);

  const onCloseShare = useCallback(() => {
    setShowShare(false);
  }, []);

  const onScroll = useCallback(e => {
    scrollLeftCache.current = e.detail.scrollLeft;
  }, []);

  return (
    <View className={styles.wrap}>
      <ScrollView
        className={styles.scrollView}
        scrollX
        scrollY
        scrollLeft={scrollLeft}
        onScroll={onScroll}
      >
        <View
          className={styles.container}
          style={{
            width: `${sceneConfig.width}rpx`,
            height: `${sceneConfig.height}rpx`,
            transform: `scale(${scale})`,
            transformOrigin: 'left top',
          }}
        >
          <Image
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${sceneConfig.width}rpx`,
              height: `${sceneConfig.height}rpx`,
            }}
            src={sceneConfig.sceneImage}
          />
          {sceneConfig.itemList.map(item => (
            <Item key={item.id} item={item} onShowHideMoney={onShowHideMoney} />
          ))}
          {sceneConfig.itemNomalList.map((item, index) => (
            <View key={index} className={styles.item} style={item.style}>
              <Image src={item.image} />
            </View>
          ))}
        </View>
      </ScrollView>

      {showHideMoney ? <HideMoney onClose={onCloseHideMoney} onShowShare={onShowShare} /> : null}

      {showShare ? <Share onClose={onCloseShare} shareMoney={shareMoney.current} /> : null}
    </View>
  );
}

function Item({ item, onShowHideMoney }) {
  const [offset, setOffset] = useState(() => {
    const temp = item.info.plist[item.currentPlist];

    return `${temp[0]}rpx, ${temp[1]}rpx`;
  });
  const [highLightStatus, setHighLightStatus] = useState(() => {
    return cacheCtrl.getMode() === 1 ? true : false;
  });

  /** 1: 默认 2: 藏钱开始 3: 藏钱结束 */
  const flag = useRef(1);
  const animationStatus = useRef(false);

  const onClickItem = useCallback(() => {
    if (animationStatus.current) {
      return;
    }

    /** 找钱逻辑 */
    if (cacheCtrl.getMode() === 2 && flag.current === 2) {
      return;
    }

    setHighLightStatus(false);

    animationStatus.current = true;

    let { unAnimation, plist } = item.info;

    switch (flag.current) {
      case 1:
        flag.current = 2;

        cacheCtrl.setItemId(item.id);
        break;
      case 2:
        flag.current = 3;

        unAnimation = [...unAnimation];
        unAnimation.reverse();
        break;
    }

    let points: Array<string> = [];
    let temp;

    for (let i = 0, len = unAnimation.length; i < len; i++) {
      temp = plist[unAnimation[i]];

      points.push(`${temp[0]}rpx, ${temp[1]}rpx`);
    }

    const duration = 500;
    const count = unAnimation.length;
    const intervalTime = duration / count;
    let start = 0;

    const execute = () => {
      const point = points[start++];

      setOffset(point);
    };

    const fn = () => {
      execute();

      setTimeout(() => {
        if (count === start) {
          /** 动画结束 */
          animationStatus.current = false;

          if (flag.current === 2) {
            /** 找钱逻辑 */
            if (cacheCtrl.getMode() === 2) {
              if (cacheCtrl.getRoomInfo().itemId == item.id) {
                Taro.showToast({
                  title: '恭喜你找到了钱',
                });
              } else {
                Taro.showToast({
                  title: '很遗憾，没找到',
                });
              }

              return;
            }

            onShowHideMoney && onShowHideMoney(onClickItem);
          }

          if (flag.current === 3) {
            flag.current = 1;

            setHighLightStatus(true);
          }

          return;
        }

        fn();
      }, intervalTime);
    };

    fn();
  }, [item.info, onShowHideMoney, item.id]);

  return (
    <View
      className={styles.item}
      style={{
        width: `${item.info.width}rpx`,
        height: `${item.info.height}rpx`,
        ...item.info.istyle,
      }}
      animation={item.animation}
    >
      <Image
        style={{
          width: `${item.info.rwidth}rpx`,
          height: `${item.info.rheight}rpx`,
          transform: `translate(${offset})`,
        }}
        src={item.image}
        onClick={onClickItem}
      />
      {highLightStatus ? <Image className={styles.highLight} src={item.highLight} /> : null}
    </View>
  );
}

function HideMoney({ onClose, onShowShare }) {
  const inputValue = useRef(0);
  const submitStatus = useRef(false);

  const onHide = useCallback(() => {
    if (submitStatus.current) {
      return;
    }

    if (!inputValue.current) {
      Taro.showToast({
        title: '金额不能为空或0',
        icon: 'none',
      });

      return;
    }

    submitStatus.current = true;

    Taro.showLoading({
      title: '',
      mask: true,
    });

    const [, excute]: Array<any> = httpCtrl.post('/room/hidemoney', {
      money: inputValue.current,
      itemId: cacheCtrl.getItemId() + '',
      sceneId: sceneConfig.sceneId,
    });

    excute
      .then(() => {
        onClose && onClose(true);

        onShowShare && onShowShare(inputValue.current);

        Taro.hideLoading();
      })
      .finally(() => {
        submitStatus.current = false;
      });
  }, [onClose, onShowShare]);

  const onInput = useCallback(e => {
    inputValue.current = e.detail.value;
  }, []);

  return (
    <View className={styles.hideMoneyModal}>
      <View className={styles.content}>
        <View className={styles.inputAmount}>
          <View>金额：</View>
          <Input
            className={styles.value}
            type='number'
            placeholder='请输入金额'
            maxlength={5}
            onInput={onInput}
          />
          <View>元</View>
        </View>

        <View className={styles.fee}>需收取5%服务费</View>
        <View className={styles.tip}>未被找完的红包，将于24小时后自动退回微信钱包</View>
        <View className={styles.close} onClick={() => onClose && onClose()}>
          <Image src={iconClose} />
        </View>
        <View className={styles.btn}>
          <CustomButton btnText='藏钱' onClick={onHide} />
        </View>
      </View>
    </View>
  );
}

function Share({ onClose, shareMoney }) {
  const { nickName } = cacheCtrl.getUserInfo() || {};
  const roomId = cacheCtrl.getRoomId();

  useShareAppMessage(res => {
    const shareContent = {
      hide: '红包新玩法，快来藏钱让朋友找吧',
      find: `${nickName}在房间藏钱了，快来找吧`,
    };

    if (res.from === 'button') {
      // 来自页面内转发按钮

      return {
        title: shareContent.find,
        path: `/pages/main/index/index?roomId=${roomId}`,
      };
    }

    return {
      title: shareContent.hide,
      path: '/pages/main/index/index',
    };
  });

  return (
    <View className={styles.shareModal}>
      <View className={styles.shareContent}>
        <View className={styles.title}>藏钱成功</View>
        <View className={styles.word}>藏钱金额：{shareMoney} 元</View>
        <View className={styles.shareBtnContainer}>
          {/* <CustomButton className={styles.btn} btnText="生成海报" /> */}
          <CustomButton openType='share' btnText='分享给好友' />
        </View>
        <View className={styles.close} onClick={onClose}>
          <Image src={iconClose} />
        </View>
      </View>
    </View>
  );
}
