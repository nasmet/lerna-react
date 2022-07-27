/*
 * @Description: app应用
 * @Author: 吴锦辉
 * @Date: 2021-08-16 08:55:25
 * @LastEditTime: 2022-07-27 15:51:22
 */

import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import KeepAlive from 'wjh-keepalive';
import RenderRouters from 'wjh-routers';
import { theme } from 'wjh-util';
import themeConfig from '@theme';
import { WrapContainer, store } from '@store';
import i18Ctrl from '@i18';
import routers from './routers';

theme.changeTheme(themeConfig.default);

function App() {
  useEffect(() => {
    i18Ctrl.initLanguage();
    import('./utils').then(res => {
      console.log(res.getName('jack'));
    });
  }, []);

  return (
    <BrowserRouter>
      <RenderRouters routerConfig={routers} KeepAliveCmp={KeepAlive} />
    </BrowserRouter>
  );
}

export default WrapContainer(App, store);
