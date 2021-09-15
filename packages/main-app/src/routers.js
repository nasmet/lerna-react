/*
 * @Description: 路由配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 08:57:07
 * @LastEditTime: 2021-09-15 17:57:14
 */

import React, { lazy } from 'react';
import cacheCtrl from '@cache';
import BaseLayout from '@pages/base-layout';

const Login = lazy(() => import('@pages/login'));
const Register = lazy(() => import('@pages/register'));
const MainLayout = lazy(() => import('@pages/main-layout'));

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
        path: '/user/login',
        Component: Login,
        exact: true,
      },
      {
        path: '/user/register',
        Component: Register,
        exact: true,
      },
      {
        path: '/main',
        Component: MainLayout,
        exact: true,
        children: [],
        WrapperComponent,
      },
      {
        redirect: true,
        from: '/',
        to: '/user/login',
      },
    ],
  },
];
