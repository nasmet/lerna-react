/*
 * @Description: app应用
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:26:05
 * @LastEditTime: 2021-09-16 16:13:12
 */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RenderRouters from 'wjh-routers';
import routers from './routers';

export default function App() {
  return (
    <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/main/operation' : ''}>
      <RenderRouters routerConfig={routers} />
    </BrowserRouter>
  );
}
