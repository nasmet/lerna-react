/*
 * @Description: 根路由组件
 * @Author: 吴锦辉
 * @Date: 2021-08-11 14:40:36
 * @LastEditTime: 2021-08-13 11:27:40
 */

import React from 'react';
import { Link } from 'react-router-dom';

export default function BasicLayout(props) {
  return (
    <>
      <div>欢迎使用该脚手架，联系方式：手机号：15770938126， 微信号：nasmet，有问题可以联系</div>
      <div>{props.children}</div>
    </>
  );
}
