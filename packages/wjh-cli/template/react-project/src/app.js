/*
 * @Description: app应用
 * @Author: 吴锦辉
 * @Date: 2021-08-13 11:15:12
 * @LastEditTime: 2021-08-16 16:50:37
 */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RenderRouters from 'wjh-routers';
import routers from './routers';

export default function App() {
  return (
    <BrowserRouter>
      <RenderRouters routerConfig={routers} />
    </BrowserRouter>
  );
}
