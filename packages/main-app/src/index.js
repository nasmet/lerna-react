/*
 * @Description: 渲染入口文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 08:56:03
 * @LastEditTime: 2021-09-16 15:26:01
 */

import React from 'react';
import { render } from 'react-dom';
import { registerMicroApps, start } from 'qiankun';
import 'antd/dist/antd.css';
import App from './app';

registerMicroApps([
  {
    name: 'child-app-operation',
    entry: '//localhost:8081',
    container: '#child-app-operation',
    activeRule: '/main/operation',
  },
]);

// 启动 qiankun
start();

render(<App />, document.getElementById('app'));
