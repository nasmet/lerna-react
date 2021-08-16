## 简介

分组路由渲染

## 使用说明

wjh-routers 是一个分组渲染组件，有两个参数

| 字段         | 是否必须 | 类型          | 描述                    |
| ------------ | -------- | ------------- | ----------------------- |
| routerConfig | 是       | Array<object> | 路由配置项              |
| loadingCmp   | 否       | ReactNode     | 使用懒加载组件的 loaing |

## 范例

npm i wjh-routers -S

```javascript
import React, { lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import RenderRouters from 'wjh-routers';

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

const routerConfig = [
  // 分组路由，children 里的路由会将父节点的 Component 作为布局组件
  {
    path: '/',
    Component: LayoutCmp,
    children: [],
  },
];

function App() {
  return (
    <BrowserRouter>
      <RenderRouters routerConfig={routerConfig} />
    </BrowserRouter>
  );
}
```
