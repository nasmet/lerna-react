import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import RenderRouters from 'wjh-routers';
import * as wjhUtils from 'wjh-util';
import { useShow, useHide, active, destory } from 'wjh-keepalive';
import styles from './index.module.scss';
import WjhRequest from '../wjh-request';
import { WrapContainer, WjhStore, store } from '../wjh-store';
import WjhComponents from '../wjh-components';
import WjhCmpsMobile from '../wjh-cmps-mobile';
import WjhUtil from '../wjh-util';

console.log(useShow, useHide);

wjhUtils.size.adapteMobileFontSize();

wjhUtils.theme.changeTheme({
  primary: '#fff',
  second: '#333',
});

function Layout(props) {
  return (
    <div>
      {props.children}
      <Link to="/user">切换路由到user</Link>
      <Link to="/home">切换路由到home</Link>
      <Link to="/destory">切换路由到销毁</Link>
      <div className={styles.word}>移动端html font-size动态计算设置</div>
      <WjhRequest />
      <WjhStore />
      <WjhComponents />
      <WjhCmpsMobile />
      <WjhUtil />
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

function User() {
  const [count, setCount] = useState(1);

  useShow(() => {
    console.log('show');
  }, '/user');

  useHide(() => {
    console.log('hide');
  }, '/user');

  useEffect(() => {
    active('/user');
  }, []);

  return <div onClick={() => setCount(pre => pre + 1)}>userInfo: {count}</div>;
}

function Home() {
  return <div>home</div>;
}

function Destory() {
  useEffect(() => {
    destory('/user');
  }, []);

  return <div>销毁路由/user</div>;
}

const routerConfig = [
  // 分组路由，children 里的路由会将父节点的 Component 作为布局组件
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: '/user',
        Component: User,
        keepAlive: true,
      },
      {
        path: '/home',
        Component: Home,
      },
      {
        path: '/destory',
        Component: Destory,
      },
    ],
    WrapperComponent,
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
