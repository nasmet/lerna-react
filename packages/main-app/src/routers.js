/*
 * @Description: 路由配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 08:57:07
 * @LastEditTime: 2021-09-16 13:56:59
 */

import React, { lazy } from 'react';
import cacheCtrl from '@cache';
import BaseLayout from '@pages/base-layout';

const AdminLayout = lazy(() => import('@pages/admin-layout'));
const MainLayout = lazy(() => import('@pages/main-layout'));

const Login = lazy(() => import('@pages/admin/login'));
const Register = lazy(() => import('@pages/admin/register'));

/**
 * 路由包装，对路由做一些拦截
 * @param  {ReactNode} options.children 子节点
 * @return {ReactNode}
 */
const WrapperComponent = ({ history, children }) => {
  if (!cacheCtrl.get('token')) {
    history.replace('/user/login');

    return null;
  }

  return children;
};

export default [
  // 分组路由，children 里的路由会将父节点的 Component 作为布局组件
  {
    path: '/',
    Component: BaseLayout,
    children: [
      {
        path: '/admin',
        Component: AdminLayout,
        exact: true,
        children: [
          {
            path: '/admin/login',
            Component: Login,
            exact: true,
          },
          {
            path: '/admin/register',
            Component: Register,
            exact: true,
          },
        ],
      },
      {
        path: '/main',
        Component: MainLayout,
        exact: true,
        children: [],
        WrapperComponent,
      },
    ],
  },
];
