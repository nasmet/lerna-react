/*
 * @Description: 渲染入口文件
 * @Author: 吴锦辉
 * @Date: 2021-08-13 11:15:52
 * @LastEditTime: 2021-08-26 09:33:39
 */

import React from 'react';
import { render } from 'react-dom';
import App from './app';
import './global.scss';

render(<App />, document.getElementById('app'));
