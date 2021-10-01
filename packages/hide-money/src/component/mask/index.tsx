/*
 * @Description: 遮罩组件
 * @Author: 吴锦辉
 * @Date: 2021-10-01 15:23:07
 * @LastEditTime: 2021-10-01 15:27:59
 */

import React from 'react';
import { View } from '@tarojs/components';
import styles from './index.module.scss';

export default function Mask(props) {
  return <View className={styles.modal}>{props.children}</View>;
}
