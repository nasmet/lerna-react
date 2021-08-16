/*
 * @Description: 路由配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 08:57:07
 * @LastEditTime: 2021-08-16 08:57:07
 */

import React, { lazy } from 'react';
import Layout from './layout';

const About = lazy(() => import('./pages/about'));

/**
 * 路由包装，对路由做一些拦截
 * @param  {ReactNode} options.children 子节点
 * @return {ReactNode}
 */
const WrapperComponent = ({ children }) => {
  return children;
};

export default [
  // 分组路由，children 里的路由会将父节点的 Component 作为布局组件
  {
    path: '/',
    Component: Layout,
    children: [
      {
        path: '/about',
        Component: About,
        WrapperComponent,
      },
    ],
  },
];
