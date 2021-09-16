/*
 * @Description: 路由配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:27:23
 * @LastEditTime: 2021-09-16 14:53:30
 */

import React, { lazy } from 'react';
import Layout from './layout';

const UserList = lazy(() => import('@pages/user/list'));

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
        path: '/user/list',
        Component: UserList,
        exact: true,
      },
    ],
  },
];
