/*
 * @Description: app应用
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:26:05
 * @LastEditTime: 2021-09-26 10:39:42
 */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import KeepAlive from 'wjh-keepalive';
import RenderRouters from 'wjh-routers';
import routers from './routers';

export default function App({ basename }) {
  basename = `/main/${basename}/operation` || '';

  return (
    <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? basename : ''}>
      <RenderRouters routerConfig={routers} KeepAliveCmp={KeepAlive} />
    </BrowserRouter>
  );
}
