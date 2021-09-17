/*
 * @Description: 渲染入口文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 08:56:03
 * @LastEditTime: 2021-09-17 13:21:08
 */

import React from 'react';
import { render } from 'react-dom';
import { start } from 'qiankun';
import 'antd/dist/antd.css';
import App from './app';

// 启动 qiankun
start();

render(<App />, document.getElementById('app'));
