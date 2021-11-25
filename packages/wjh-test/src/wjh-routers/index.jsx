import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import RenderRouters from 'wjh-routers';
import * as wjhUtils from 'wjh-util';
import WjhRequest from '../wjh-request';
import { WrapContainer, WjhStore, store } from '../wjh-store';
import WjhComponents from '../wjh-components';
import WjhCmpsMobile from '../wjh-cmps-mobile';
import WjhUtil from '../wjh-util';

wjhUtils.size.adapteMobileFontSize();

wjhUtils.theme.changeTheme({
  primary: '#fff',
  second: '#333',
});

function Layout(props) {
  console.log('12345');
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Link to="/wjhrequest">WjhRequest组件测试</Link>
      <Link to="/wjhstore">WjhStore组件测试</Link>
      <Link to="/wjhcomponents">WjhComponents组件测试</Link>
      <Link to="/wjhcmpsmobile">WjhCmpsMobile组件测试</Link>
      <Link to="/wjhutil">WjhUtil组件测试</Link>
      {props.children}
    </div>
  );
}

/**
 * 路由包装，对路由做一些拦截
 * @param  {ReactNode} options.children 子节点
 * @return {ReactNode}
 */
const WrapperComponent = ({ children }) => {
  return children;
};

const routerConfig = [
  // 分组路由，children 里的路由会将父节点的 Component 作为布局组件
  {
    path: '/',
    Component: Layout,
    WrapperComponent,
    children: [
      {
        path: '/wjhrequest',
        Component: WjhRequest,
        exact: true,
      },
      {
        path: '/wjhstore',
        Component: WjhStore,
        exact: true,
      },
      {
        path: '/wjhcomponents',
        Component: WjhComponents,
        exact: true,
      },
      {
        path: '/wjhcmpsmobile',
        Component: WjhCmpsMobile,
        exact: true,
      },
      {
        path: '/wjhutil',
        Component: WjhUtil,
        exact: true,
      },
    ],
  },
];

function App() {
  return (
    <BrowserRouter>
      <RenderRouters routerConfig={routerConfig} />
    </BrowserRouter>
  );
}

export default WrapContainer(App, store);
