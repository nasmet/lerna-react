## 简介
路由配置渲染组件，适用于react

## 安装
npm i wjh-routers -S

## 范例
```javascript
import React, { lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RenderRouters from 'wjh-routers';
import KeepAlive from 'wjh-keepalive';

function Layout(props) {
  return <div>{props.children}</div>;
}

const LayoutCmp = lazy(() => Layout);

/**
 * 路由包装，对路由做一些拦截
 * @param  {ReactNode} options.children 子节点
 * @return {ReactNode}
 */
const WrapperComponent = ({ children }) => {
  return children;
};

/** 懒加载组件 */
const loadingCmp = <span>loading</span>    

const routerConfig = [
  // 分组路由，children 里的路由会将父节点的 Component 作为布局组件
  {
    path: '/',
    Component: LayoutCmp,
    children: [],
    WrapperComponent, // 默认为null
    isSwitch: true, // 分组路由是否使用Switch组件包裹，默认为false
    keepAlive: true, // 路由缓存, 需要引入wjh-keepalive模块，默认为false, 当设置为true时，父级路由isSwitch需设置为false
  },
];

function App() {
  return (
    <BrowserRouter>
      <RenderRouters routerConfig={routerConfig} loadingCmp={loadingCmp} KeepAliveCmp={KeepAlive} />
    </BrowserRouter>
  );
}
```

## 其他
配合wjh-keepalive模块使用，可以实现路由缓存功能，具体查看wjh-keepalive
