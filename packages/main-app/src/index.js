/*
 * @Description: 渲染入口文件
 * @Author: 吴锦辉
 * @Date: 2021-08-11 14:19:40
 * @LastEditTime: 2021-08-12 12:54:17
 */

import React from 'react';
import { render } from 'react-dom';
import { registerMicroApps, start } from 'qiankun';
import 'antd/dist/antd.css';
import App from './app';

registerMicroApps([
  {
    name: 'child-app',
    entry: '//localhost:8081',
    container: '#child-app',
    activeRule: '/child-app',
  },
]);

// 启动 qiankun
start();

render(<App />, document.getElementById('app'));
