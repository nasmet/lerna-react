/*
 * @Description: 主场景
 * @Author: 吴锦辉
 * @Date: 2021-09-27 09:23:20
 * @LastEditTime: 2021-10-01 17:19:26
 */

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Taro, { useShareAppMessage, useRouter, useDidShow } from '@tarojs/taro';
import { View, ScrollView, Image, Input, Swiper, SwiperItem, Text } from '@tarojs/components';
import VirtualList from '@tarojs/components/virtual-list';
import classNames from 'classnames';
import sceneConfig from '@scene';
import cacheCtrl from '@cache';
import { CustomButton, Mask } from '@component';
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
  const [showWallet, setShowWallet] = useState(false);

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

  useShareAppMessage(() => {
    const mode = roomCtrl.getMode();

    if (mode === MODE.FIND) {
      // eslint-disable-next-line no-shadow
      const { roomId, nickName } = roomCtrl.getFindRoomInfo();

      return {
        title: `${nickName}在房间藏钱了，快来找吧`,
        path: `/pages/main/index/index?roomId=${roomId}&from=share`,
        imageUrl: iconRoom,
      };
    }

    const id = roomCtrl.getHideRoomInfo().roomId;

    if (mode === MODE.HIDE && id) {
      const { nickName } = cacheCtrl.getUserInfo() || {};

      return {
        title: `${nickName}在房间藏钱了，快来找吧`,
        path: `/pages/main/index/index?roomId=${id}&from=share`,
        imageUrl: iconRoom,
      };
    }

    return {
      title: '红包新玩法，快来藏钱让朋友找吧',
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
          showCancel: false,
        });
      }

      Taro.hideLoading();
    });
  }, []);

  useEffect(() => {
    if (showHideMoney || showShare || showRank || showWallet) {
      setScrollLeft(scrollLeftCache.current);
    }
  }, [showHideMoney, showShare, showRank, showWallet]);

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

  const onShowWallet = useCallback(() => {
    setShowWallet(true);
  }, []);

  const onCloseWallet = useCallback(() => {
    setShowWallet(false);
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

      <Menu showRank={onShowRank} showWallet={onShowWallet} />

      {showHideMoney ? <HideMoney onClose={onCloseHideMoney} /> : null}

      {showShare ? <Share onClose={onCloseShare} /> : null}

      {showRank ? <Rank onClose={onCloseRank} /> : null}

      {showWallet ? <Wallet onClose={onCloseWallet} /> : null}
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
        showCancel: false,
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
    <Mask>
      <View className={styles.hideMoneyContent}>
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
    </Mask>
  );
}

function Share({ onClose }) {
  return (
    <Mask>
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
    </Mask>
  );
}

const menuData = [
  {
    type: 'wallet',
    icon: require('@img/bar-5.png'),
    name: '钱包',
  },
  {
    type: 'rank',
    icon: require('@img/bar-3.png'),
    name: '排行榜',
  },
];

function Menu({ showRank, showWallet }) {
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
        case 'wallet':
          showWallet && showWallet();
          return;
      }
    },
    [showRank, showWallet]
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
    type: 'hideMoney',
    name: '藏钱',
  },
  {
    type: 'findMoney',
    name: '找钱',
  },
];

function Rank({ onClose }) {
  const [current, setCurrent] = useState(0);

  const onSwiperChange = useCallback(e => {
    setCurrent(e.detail.current);
  }, []);

  return (
    <Mask>
      <View className={styles.rankContent}>
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
        <View className={styles.close} onClick={onClose}>
          <Image src={iconClose} />
        </View>
      </View>
    </Mask>
  );
}

const rankIconData = [
  require('@img/icon-rank1.png'),
  require('@img/icon-rank2.png'),
  require('@img/icon-rank3.png'),
];

function RankContent({ type }) {
  const [data, setData] = useState<Array<object>>([]);
  const [loading, setLoading] = useState(false);
  const [requestParams, setRequestParams] = useState(() => ({
    page: 1,
    pageSize: 10,
    sort: `${type} desc`,
  }));

  const dataLen = data.length;
  const itemSize = 50;
  const height = 400;
  const previewLoadingCount = height / itemSize;

  useEffect(() => {
    setLoading(true);

    const [, excute]: Array<any> = httpCtrl.post('/user/list', { ...requestParams });

    excute
      .then(res => {
        if (requestParams.page === 1) {
          setData(res);
        } else {
          setData(pre => [...pre, ...res]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [requestParams]);

  const Row = useCallback(props => {
    // eslint-disable-next-line no-shadow
    const { id, index, style, data } = props;

    const v = data[index];

    return (
      <View className={styles.item} id={id} style={style}>
        {index < 3 ? (
          <Image className={styles.rank} src={rankIconData[index]} />
        ) : (
          <Text className={styles.rank}>{index + 1}</Text>
        )}
        <Image className={styles.avatar} src={v.avatar} />
        <Text className={styles.nickName}>{v.nickName}</Text>
        <Text className={styles.money}>{v[type]}元</Text>
      </View>
    );
  }, []);

  const onScroll = useCallback(
    ({ scrollDirection, scrollOffset }) => {
      const len = data.length;

      if (
        // 避免重复加载数据
        !loading &&
        // 只有往前滚动我们才触发
        scrollDirection === 'forward' &&
        // 5 = (列表高度 / 单项列表高度)
        // 100 = 滚动提前加载量，可根据样式情况调整
        scrollOffset > (len - previewLoadingCount - 1) * itemSize
      ) {
        setRequestParams(pre => ({
          ...pre,
          page: pre.page + 1,
        }));
      }
    },
    [loading, data, previewLoadingCount]
  );

  if (!loading && dataLen <= 0) {
    return (
      <View className={styles.noData}>
        <View className={styles.word}>暂无数据</View>
        <CustomButton openType='share' btnText='邀请好友' />
      </View>
    );
  }

  if (loading && dataLen <= 0) {
    return <View className={styles.noData}>数据加载中...</View>;
  }

  return (
    <VirtualList
      className={styles.rankList}
      width='100%'
      height={400} /* 列表的高度 */
      itemData={data} /* 渲染列表的数据 */
      itemCount={dataLen} /*  渲染列表的长度 */
      itemSize={50} /* 列表单项的高度  */
      onScroll={onScroll}
    >
      {/* 列表单项组件，这里只能传入一个组件 */}
      {Row}
    </VirtualList>
  );
}

function Wallet({ onClose }) {
  const [money, setMoney] = useState(0);
  const withdrawnStatus = useRef(false);

  useEffect(() => {
    Taro.showLoading();

    const [, excute]: Array<any> = httpCtrl.post('/user/withdrawable');

    excute.then(res => {
      setMoney(res.withdrawable);

      Taro.hideLoading();
    });
  }, []);

  const onWithdrawn = useCallback(() => {
    if (!money) {
      return;
    }

    if (withdrawnStatus.current) {
      return;
    }

    withdrawnStatus.current = true;

    Taro.showLoading();

    const [, excute]: Array<any> = httpCtrl.post('/user/withdrawn');

    excute
      .then(() => {
        Taro.hideLoading();

        onClose && onClose();

        Taro.showModal({
          title: '提现成功',
          content: '预计1-3个工作日到账微信钱包',
          showCancel: false,
        });
      })
      .finally(() => {
        withdrawnStatus.current = false;
      });
  }, [money, onClose]);

  return (
    <Mask>
      <View className={styles.walletContent}>
        <View className={styles.title}>可提现金额：{money}</View>
        <CustomButton
          btnText={money ? '全部提现' : '邀请好友'}
          openType={money ? '' : 'share'}
          onClick={onWithdrawn}
        />
        <View className={styles.close} onClick={onClose}>
          <Image src={iconClose} />
        </View>
      </View>
    </Mask>
  );
}
