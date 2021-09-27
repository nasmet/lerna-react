/*
 * @Description: 主场景
 * @Author: 吴锦辉
 * @Date: 2021-09-27 09:23:20
 * @LastEditTime: 2021-09-27 17:12:06
 */

import React, { useCallback, useRef, useState } from 'react';
import { View, ScrollView, Image, Input } from '@tarojs/components';
import sceneConfig from '@scene';
import iconFastHideTitle from '@img/index/default/fast-hide-title.png';
import iconClose from '@img/index/default/close.png';
import styles from './index.module.scss';

const scale = (603 * 2) / sceneConfig.height;

export default function Index() {
  return (
    <View className={styles.wrap}>
      <ScrollView
        className={styles.scrollView}
        scrollX
        scrollY
        scrollLeft={sceneConfig.scrollX}
        scrollTop={sceneConfig.scrollY}
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
            <Item key={item.id} item={item} />
          ))}
          {sceneConfig.itemNomalList.map((item, index) => (
            <View key={index} className={styles.item} style={item.style}>
              <Image src={item.Image} />
            </View>
          ))}
        </View>
      </ScrollView>

      <HideMoney />
    </View>
  );
}

function Item({ item }) {
  const [offset, setOffset] = useState(() => {
    const temp = item.info.plist[item.currentPlist];

    return `${temp[0]}rpx, ${temp[1]}rpx`;
  });
  const [highLightStatus, setHighLightStatus] = useState(true);

  /** 1: 默认 2: 藏钱开始 3: 藏钱结束 */
  const flag = useRef(1);
  const animationStatus = useRef(false);

  const onClickItem = useCallback(() => {
    if (animationStatus.current) {
      return;
    }

    setHighLightStatus(false);

    animationStatus.current = true;

    let { unAnimation, plist } = item.info;

    switch (flag.current) {
      case 1:
        flag.current = 2;
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
  }, [item.info]);

  return (
    <View
      key={item.id}
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
        src={item.Image}
        onClick={onClickItem}
      />
      {highLightStatus ? <Image className={styles.highLight} src={item.highLight}></Image> : null}
    </View>
  );
}

function HideMoney() {
  return (
    <View className={styles.fastHide}>
      <View className={styles.content}>
        <View className={styles.title}>
          <Image src={iconFastHideTitle} />
        </View>
        <View className={styles.inputAmount}>
          <View>金额：</View>
          <Input className={styles.value} type='number' placeholder='请输入金额' maxlength={5} />
          <View>元</View>
        </View>

        <View className={styles.fee}>需收取服务费 6 元</View>
        <View className={styles.tip}>*未被找完的红包，将于24小时后自动退回微信钱包</View>
        <View className={styles.close}>
          <Image src={iconClose} />
        </View>
      </View>
    </View>
  );
}
