/*
 * @Description: app应用
 * @Author: 吴锦辉
 * @Date: 2021-08-16 08:55:25
 * @LastEditTime: 2021-08-16 10:48:19
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
