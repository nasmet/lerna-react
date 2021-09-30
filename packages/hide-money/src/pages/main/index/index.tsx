/*
 * @Description: 主场景
 * @Author: 吴锦辉
 * @Date: 2021-09-27 09:23:20
 * @LastEditTime: 2021-09-30 16:55:14
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Taro, { useShareAppMessage, useRouter, useDidShow } from '@tarojs/taro';
import { View, ScrollView, Image, Input, Swiper, SwiperItem, Text } from '@tarojs/components';
import classNames from 'classnames';
import sceneConfig from '@scene';
import cacheCtrl from '@cache';
import { CustomButton } from '@component';
import httpCtrl from '@api';
import iconRoom from '@img/fangjian/scene.png';
import iconClose from '@img/icon-close.png';
import iconMenu from '@img/bar-6.png';
import roomCtrl from '../controller/room';
import styles from './index.module.scss';

const { windowHeight = 603 } = cacheCtrl.getSystemInfo();

const scale = (windowHeight * 2) / sceneConfig.height;

enum MODE {
  HIDE = 1,
  FIND = 2,
}

enum ITEM_STATUS {
  IDEA = 1,
  /** 开启动画 */
  OPEN = 2,
  /** 关闭动画 */
  CLOSE = 3,
}

enum MONEY {
  OPEN = 1,
  CLOSE = 2,
}

export default function Index() {
  const { roomId } = useRouter().params;

  roomCtrl.setMode(roomId ? MODE.FIND : MODE.HIDE);

  const [scrollLeft, setScrollLeft] = useState(0);
  const [showHideMoney, setShowHideMoney] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showRank, setShowRank] = useState(false);

  const scrollLeftCache = useRef(0);
  const closeItemAnimation = useRef<null | any>(null);

  useDidShow(() => {
    if (roomId) {
      roomCtrl.setFindRoomInfo({
        roomId,
      });
    } else {
      Taro.setNavigationBarTitle({
        title: '藏钱',
      });
    }
  });

  useShareAppMessage(res => {
    const { nickName } = cacheCtrl.getUserInfo() || {};
    const id = roomCtrl.getHideRoomInfo().roomId;

    const shareContent = {
      hide: '红包新玩法，快来藏钱让朋友找吧',
      find: `${nickName}在房间藏钱了，快来找吧`,
    };

    if (res.from === 'button') {
      // 来自页面内转发按钮

      return {
        title: shareContent.find,
        path: `/pages/main/index/index?roomId=${id}&from=share`,
        imageUrl: iconRoom,
      };
    }

    return {
      title: shareContent.hide,
      path: '/pages/main/index/index',
      imageUrl: iconRoom,
    };
  });

  useEffect(() => {
    if (roomCtrl.getMode() === MODE.HIDE) {
      return;
    }

    /** 找钱的房间信息 */
    Taro.showLoading({
      title: '',
      mask: true,
    });

    const [, excute]: Array<any> = httpCtrl.post('/room/info', {
      id: roomCtrl.getFindRoomInfo().roomId,
    });

    excute.then(res => {
      /** 这里需要处理下房间过期以及红包是否已经被领取，限制找钱次数 */
      roomCtrl.setFindRoomInfo(res);

      Taro.setNavigationBarTitle({
        title: res.nickName ? `${res.nickName}的房间` : '找钱',
      });

      if (res.status === 1) {
        Taro.showModal({
          title: '',
          content: '很遗憾，钱已经被领取了',
        });

        return;
      }

      Taro.hideLoading();
    });
  }, []);

  useEffect(() => {
    if (showHideMoney) {
      setScrollLeft(scrollLeftCache.current);
    }
  }, [showHideMoney]);

  const onScroll = useCallback(e => {
    scrollLeftCache.current = e.detail.scrollLeft;
  }, []);

  const onShowHideMoney = useCallback(cb => {
    setShowHideMoney(true);

    closeItemAnimation.current = cb;
  }, []);

  const onCloseHideMoney = useCallback(status => {
    setShowHideMoney(false);

    if (status === MONEY.OPEN) {
      closeItemAnimation.current && closeItemAnimation.current(status);
    } else {
      closeItemAnimation.current && closeItemAnimation.current();
    }
  }, []);

  const onShowShare = useCallback(() => {
    setShowShare(true);
  }, []);

  const onCloseShare = useCallback(() => {
    setShowShare(false);
  }, []);

  const onShowRank = useCallback(() => {
    setShowRank(true);
  }, []);

  const onCloseRank = useCallback(() => {
    setShowRank(false);
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
            <Item
              key={item.id}
              item={item}
              onShowHideMoney={onShowHideMoney}
              onShowShare={onShowShare}
            />
          ))}
          {sceneConfig.itemNomalList.map((item, index) => (
            <View key={index} className={styles.item} style={item.style}>
              <Image src={item.image} />
            </View>
          ))}
        </View>
      </ScrollView>

      <Menu showRank={onShowRank} />

      {showHideMoney ? <HideMoney onClose={onCloseHideMoney} /> : null}

      {showShare ? <Share onClose={onCloseShare} /> : null}

      {showRank ? <Rank onClose={onCloseRank} /> : null}
    </View>
  );
}

function Item({ item, onShowHideMoney, onShowShare }) {
  const [offset, setOffset] = useState(() => {
    const temp = item.info.plist[item.currentPlist];

    return `${temp[0]}rpx, ${temp[1]}rpx`;
  });
  const [highLightStatus, setHighLightStatus] = useState(() => roomCtrl.getMode() === MODE.HIDE);

  /** 1: 默认 2: 藏钱开始 3: 藏钱结束 */
  const itemStatus = useRef(ITEM_STATUS.IDEA);
  const animationStatus = useRef(false);

  /** 找钱接口判断 */
  const findMoney = useCallback(() => {
    Taro.showLoading({
      title: '',
      mask: true,
    });

    const [, excute]: Array<any> = httpCtrl.post('/room/findMoney', {
      roomId: roomCtrl.getFindRoomInfo().roomId,
      itemId: item.id + '',
    });

    excute.then(() => {
      Taro.showModal({
        title: '恭喜你找到了钱',
        content: '已存入到你的钱包',
      });

      Taro.hideLoading();
    });
  }, [item.id]);

  const onClickItem = useCallback(
    status => {
      if (animationStatus.current) {
        return;
      }

      const mode = roomCtrl.getMode();

      /** 找钱item结束逻辑 */
      if (mode === MODE.FIND && itemStatus.current === ITEM_STATUS.OPEN) {
        return;
      }

      setHighLightStatus(false);

      animationStatus.current = true;

      const { unAnimation, inAnimation, plist } = item.info;
      let aimation: Array<number> = unAnimation;

      switch (itemStatus.current) {
        case ITEM_STATUS.IDEA:
          itemStatus.current = ITEM_STATUS.OPEN;

          if (mode === MODE.HIDE) {
            roomCtrl.setHideRoomInfo({
              itemId: item.id,
            });
          }

          if (mode === MODE.FIND && roomCtrl.getFindRoomInfo().itemId == item.id) {
            aimation = inAnimation;
          }
          break;
        case ITEM_STATUS.OPEN:
          itemStatus.current = ITEM_STATUS.CLOSE;

          if (status === MONEY.OPEN) {
            aimation = [...inAnimation].reverse();
          } else {
            aimation = [...unAnimation].reverse();
          }

          break;
      }

      let points: Array<string> = [];
      let temp;

      for (let i = 0, len = aimation.length; i < len; i++) {
        temp = plist[aimation[i]];

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

            if (itemStatus.current === ITEM_STATUS.OPEN) {
              /** 找钱逻辑 */
              if (mode === MODE.FIND) {
                if (roomCtrl.getFindRoomInfo().itemId == item.id) {
                  /** 这里需要查询接口，判断红包是否被领走了 */
                  findMoney();
                } else {
                  Taro.showToast({
                    title: '很遗憾，没找到',
                    icon: 'none',
                  });
                }

                return;
              }

              onShowHideMoney && onShowHideMoney(onClickItem);
            }

            if (itemStatus.current === ITEM_STATUS.CLOSE) {
              itemStatus.current = ITEM_STATUS.IDEA;

              setHighLightStatus(true);

              if (status === MONEY.OPEN) {
                onShowShare && onShowShare();
              }
            }

            return;
          }

          fn();
        }, intervalTime);
      };

      fn();
    },
    [item.info, onShowHideMoney, onShowShare, item.id, findMoney]
  );

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
        onClick={() => onClickItem(undefined)}
      />
      {highLightStatus ? <Image className={styles.highLight} src={item.highLight} /> : null}
    </View>
  );
}

function HideMoney({ onClose }) {
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
      itemId: roomCtrl.getHideRoomInfo().itemId + '',
      sceneId: sceneConfig.sceneId,
    });

    excute
      .then(res => {
        roomCtrl.setHideRoomInfo({
          roomId: res.roomId,
        });

        onClose && onClose(MONEY.OPEN);

        roomCtrl.setHideRoomInfo({
          money: inputValue.current,
        });

        Taro.hideLoading();
      })
      .finally(() => {
        submitStatus.current = false;
      });
  }, [onClose]);

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

function Share({ onClose }) {
  return (
    <View className={styles.shareModal}>
      <View className={styles.shareContent}>
        <View className={styles.title}>藏钱成功</View>
        <View className={styles.word}>藏钱金额：{roomCtrl.getHideRoomInfo().money} 元</View>
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

const menuData = [
  {
    type: 'tixian',
    icon: require('@img/bar-5.png'),
    name: '提现入口',
  },
  {
    type: 'rank',
    icon: require('@img/bar-3.png'),
    name: '排行榜',
  },
];

function Menu({ showRank }) {
  const [expandStatus, setExpandStatus] = useState(false);

  const onExpandChange = useCallback(() => {
    setExpandStatus(pre => !pre);
  }, []);

  const onBarChange = useCallback(
    type => {
      switch (type) {
        case 'rank':
          showRank && showRank();
          return;
      }
    },
    [showRank]
  );

  return (
    <View className={styles.menuContainer}>
      <View className={styles.barContainer}>
        <View className={classNames(styles.bars, { [styles.active]: expandStatus })}>
          {menuData.map((v, index) => (
            <View key={index} className={styles.bar}>
              <Image src={v.icon} mode='widthFix' onClick={() => onBarChange(v.type)} />
            </View>
          ))}
        </View>
      </View>
      <View
        className={classNames(styles.menu, { [styles.active]: expandStatus })}
        onClick={onExpandChange}
      >
        <Image src={iconMenu} />
      </View>
    </View>
  );
}

const rankData = [
  {
    type: 'hide',
    name: '藏钱',
  },
  {
    type: 'find',
    name: '找钱',
  },
];

function Rank({ onClose }) {
  const [current, setCurrent] = useState(0);

  const onSwiperChange = useCallback(e => {
    setCurrent(e.detail.current);
  }, []);

  return (
    <View className={styles.rankModal}>
      <View className={styles.content}>
        <View className={styles.tabs}>
          {rankData.map((v, index) => (
            <View
              key={index}
              className={classNames(styles.tab, { [styles.active]: current === index })}
              onClick={() => setCurrent(index)}
            >
              {v.name}
            </View>
          ))}
        </View>
        <Swiper className={styles.swiper} current={current} onChange={onSwiperChange}>
          {rankData.map((v, index) => (
            <SwiperItem key={index}>
              <RankContent type={v.type} />
            </SwiperItem>
          ))}
        </Swiper>
      </View>
    </View>
  );
}

function RankContent({ type }) {
  const [data, setData] = useState<Record<string, any>>([]);

  return (
    <ScrollView scrollY>
      <View>
        {data.map((v, index) => (
          <View key={index}>
            {index < 3 ? <Image src={v.avatar} /> : index + 1}
            <Image src={v.avatar} />
            <Text>{v.nickName}</Text>
            <Text>{v.money}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
