/*
 * @Description: 入口文件
 * @Author: 吴锦辉
 * @Date: 2021-07-20 13:51:17
 * @LastEditTime: 2021-08-31 11:03:02
 */

import React from 'react';
import { render } from 'react-dom';
import 'antd/dist/antd.css';
import * as wjhUtils from 'wjh-util';
import App from './app';

wjhUtils.size.adapteMobileFontSize();

render(<App />, document.getElementById('app'));
