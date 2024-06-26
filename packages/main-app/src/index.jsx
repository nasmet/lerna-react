/*
 * @Description: 渲染入口文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 08:56:03
 * @LastEditTime: 2022-07-21 14:14:35
 */

import React from 'react';
import { render } from 'react-dom';
import { start } from 'qiankun';
import App from './app';

// 启动 qiankun
start();

render(<App />, document.getElementById('app'));
