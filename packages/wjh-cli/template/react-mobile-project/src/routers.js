/*
 * @Description: 路由配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-13 11:16:42
 * @LastEditTime: 2021-08-13 11:22:10
 */

import Layout from './layout';

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
    WrapperComponent,
    children: [],
  },
];
