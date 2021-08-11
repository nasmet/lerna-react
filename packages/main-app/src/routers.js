/*
 * @Description: 路由配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-11 17:00:36
 * @LastEditTime: 2021-08-11 17:33:31
 */

import Layout from './layout';

export default [
  // 分组路由，children 里的路由会将父节点的 Component 作为布局组件
  {
    path: '/',
    Component: Layout,
    auth: true,
  },
];
