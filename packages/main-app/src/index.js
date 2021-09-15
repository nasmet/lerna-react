/*
 * @Description: 渲染入口文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 08:56:03
 * @LastEditTime: 2021-08-16 08:56:11
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
