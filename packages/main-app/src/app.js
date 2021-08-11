/*
 * @Description: app应用
 * @Author: 吴锦辉
 * @Date: 2021-08-11 14:32:08
 * @LastEditTime: 2021-08-11 17:38:10
 */

import React, { Suspense } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import routers from './routers';

/**
 * 路由拦截
 * @param  {ReactNode} options.children 子节点
 * @return {ReactNode}
 */
const RouteIntercept = ({ children }) => {
  return children;
};

/**
 * 路由组件
 * @param  {object} route
 * @return {ReactNode}
 */
const RouteItem = route => {
  const { redirect, path, Component, auth } = route;

  if (redirect) {
    return <Redirect key={path} exact from={path} to={redirect} />;
  }

  if (!auth) {
    return <Route key={path} path={path} render={props => <Component {...props} />} />;
  }

  return (
    <Route
      key={path}
      path={path}
      render={props => {
        return (
          <RouteIntercept {...props}>
            <Component {...props} />
          </RouteIntercept>
        );
      }}
    />
  );
};

// 资源预加载Loading样式
const fallback = <div>loading......</div>;

/**
 * 递归遍历子路由
 * @param  {[type]}   route [description]
 * @return {Function}       [description]
 */
function fn(route) {
  const { Component, children, path } = route;

  if (children && children.length > 0) {
    return (
      <Route
        key={path}
        path={path}
        render={props => {
          return (
            <RouteIntercept {...props}>
              <Component {...props}>
                <Suspense fallback={fallback}>
                  <Switch>
                    {children.map(routeChild => {
                      return fn(routeChild);
                    })}
                  </Switch>
                </Suspense>
              </Component>
            </RouteIntercept>
          );
        }}
      />
    );
  }

  return RouteItem(route);
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={fallback}>
        <Switch>{routers.map(fn)}</Switch>
      </Suspense>
    </BrowserRouter>
  );
}
