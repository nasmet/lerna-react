/*
 * @Description: app应用
 * @Author: 吴锦辉
 * @Date: 2021-08-16 08:55:25
 * @LastEditTime: 2021-09-22 16:10:08
 */

import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RenderRouters from 'wjh-routers';
import { theme } from 'wjh-util';
import 'antd/dist/antd.css';
import themeConfig from '@theme';
import { WrapContainer, store } from '@store';
import i18Ctrl from '@i18';
import routers from './routers';

theme.changeTheme(themeConfig.default);

function App() {
  useEffect(() => {
    i18Ctrl.initLanguage();
  }, []);

  return (
    <BrowserRouter>
      <RenderRouters routerConfig={routers} />
    </BrowserRouter>
  );
}

export default WrapContainer(App, store);
