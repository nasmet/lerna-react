/*
 * @Description: 入口文件
 * @Author: 吴锦辉
 * @Date: 2021-07-20 13:51:17
 * @LastEditTime: 2021-09-07 14:55:57
 */

import React from 'react';
import { render } from 'react-dom';
import 'antd/dist/antd.css';
import * as wjhUtils from 'wjh-util';
import App from './app';

wjhUtils.size.adapteMobileFontSize();

let c = 1;

render(<App />, document.getElementById('app'));
