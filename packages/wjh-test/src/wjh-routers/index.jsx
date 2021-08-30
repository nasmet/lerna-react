import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import RenderRouters from 'wjh-routers';
import styles from './index.module.scss';
import { WrapContainer, WjhStore, store } from '../wjh-store';
import WjhComponents from '../wjh-components';
import WjhRequest from '../wjh-request';

function Layout(props) {
  return (
    <div>
      {props.children}
      {/* <div className={styles.word}>移动端html font-size动态计算设置</div> */}
      {/* <WjhRequest /> */}
      {/* <WjhStore /> */}
      <WjhComponents />
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
    children: [],
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
