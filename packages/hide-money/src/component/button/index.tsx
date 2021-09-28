/*
 * @Description: 按钮组件
 * @Author: 吴锦辉
 * @Date: 2021-09-28 10:05:51
 * @LastEditTime: 2021-09-28 10:22:17
 */

import React from 'react';
import classNames from 'classnames';
import { View, Button, Image } from '@tarojs/components';
import iconBtn from '@img/icon-btn.png';
import styles from './index.module.scss';

export default function CustomButton({ className = '', btnText, ...other }) {
  return (
    <View className={classNames(styles.btnContainer, className)}>
      <Image className={styles.btnBg} src={iconBtn} />
      <Button className={styles.btn} {...other}>
        {btnText}
      </Button>
    </View>
  );
}
