/*
 * @Description: 根路由组件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:24:44
 * @LastEditTime: 2021-09-16 16:29:27
 */

import React from 'react';
import styles from './index.module.scss';

export default function BasicLayout(props) {
  return <div className={styles.wrap}>{props.children}</div>;
}
