/*
 * @Description: 渲染入口文件
 * @Author: 吴锦辉
 * @Date: 2021-08-11 14:19:40
 * @LastEditTime: 2021-08-11 14:31:45
 */

import React from 'react';
import { render } from 'react-dom';
import 'antd/dist/antd.css';
import App from './app';

render(<App />, document.getElementById('app'));
