/*
 * @Description: 路由分组渲染方法
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:55:58
 * @LastEditTime: 2021-09-15 11:33:48
 */

import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import KeepAlive from 'wjh-keepalive';

/**
 * 路由组件
 * @param  {object} route
 * @return {ReactNode}
 */
const RouteItem = route => {
  const { redirect, from, to, path, Component, WrapperComponent, keepAlive } = route;

  if (redirect) {
    return <Redirect key={from + to} from={from} to={to} />;
  }

  const obj = {};

  obj[`${keepAlive ? 'children' : 'render'}`] = props => {
    if (!WrapperComponent) {
      if (keepAlive) {
        return (
          <KeepAlive {...props}>
            <Component {...props} />
          </KeepAlive>
        );
      }

      return <Component {...props} />;
    }

    if (keepAlive) {
      return (
        <KeepAlive {...props}>
          <WrapperComponent>
            <Component {...props} />
          </WrapperComponent>
        </KeepAlive>
      );
    }

    return (
      <WrapperComponent>
        <Component {...props} />
      </WrapperComponent>
    );
  };

  return <Route key={path} path={path} {...obj} />;
};

// 资源预加载Loading样式
const fallback = <div>loading......</div>;

/**
 * 递归遍历子路由
 * @param  {[type]}   route [description]
 * @return {Function}       [description]
 */
function fn(route) {
  const { Component, children, path, WrapperComponent, keepAlive } = route;

  if (children && children.length > 0) {
    const render = props => {
      return (
        <Component {...props}>
          <Suspense fallback={fallback}>
            {/* <Switch> */}
            {children.map(routeChild => {
              return fn(routeChild);
            })}
            {/* </Switch> */}
          </Suspense>
        </Component>
      );
    };

    const obj = {};

    obj[`${keepAlive ? 'children' : 'render'}`] = props => {
      if (!WrapperComponent) {
        if (keepAlive) {
          return <KeepAlive {...props}>{render(props)}</KeepAlive>;
        }

        return render(props);
      }

      if (keepAlive) {
        return (
          <KeepAlive {...props}>
            <WrapperComponent>{render(props)}</WrapperComponent>
          </KeepAlive>
        );
      }

      return <WrapperComponent>{render(props)}</WrapperComponent>;
    };

    return <Route key={path} path={path} {...obj} />;
  }

  return RouteItem(route);
}

export default function RenderRouters({ routerConfig, loadingCmp }) {
  if (!routerConfig) {
    throw new Error('routerConfig路由配置未传入');
  }

  return (
    <Suspense fallback={loadingCmp || fallback}>
      <Switch>{routerConfig.map(fn)}</Switch>
    </Suspense>
  );
}
