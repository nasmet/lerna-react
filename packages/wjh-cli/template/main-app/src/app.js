/*
 * @Description: app应用
 * @Author: 吴锦辉
 * @Date: 2021-08-16 08:55:25
 * @LastEditTime: 2021-08-16 08:55:32
 */

import React, { Suspense } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import routers from './routers';

/**
 * 路由组件
 * @param  {object} route
 * @return {ReactNode}
 */
const RouteItem = route => {
  const { redirect, path, Component, WrapperComponent } = route;

  if (redirect) {
    return <Redirect key={path} exact from={path} to={redirect} />;
  }

  return (
    <Route
      key={path}
      path={path}
      render={props => {
        if (!WrapperComponent) {
          return <Component {...props} />;
        }

        return (
          <WrapperComponent {...props}>
            <Component {...props} />
          </WrapperComponent>
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
  const { Component, children, path, WrapperComponent } = route;

  if (children && children.length > 0) {
    return (
      <Route
        key={path}
        path={path}
        render={props => {
          if (!WrapperComponent) {
            return (
              <Component {...props}>
                <Suspense fallback={fallback}>
                  <Switch>
                    {children.map(routeChild => {
                      return fn(routeChild);
                    })}
                  </Switch>
                </Suspense>
              </Component>
            );
          }

          return (
            <WrapperComponent>
              <Component {...props}>
                <Suspense fallback={fallback}>
                  <Switch>
                    {children.map(routeChild => {
                      return fn(routeChild);
                    })}
                  </Switch>
                </Suspense>
              </Component>
            </WrapperComponent>
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
