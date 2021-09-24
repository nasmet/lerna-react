/*
 * @Description: 入口文件
 * @Author: 吴锦辉
 * @Date: 2021-09-23 14:10:40
 * @LastEditTime: 2021-09-24 15:19:28
 */

import React, { Component } from 'react';
import { WrapContainer, store } from '@store';
import './app.scss';

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return this.props.children;
  }
}

export default WrapContainer(App, store);
