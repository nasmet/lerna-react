/*
 * @Description: 根路由组件
 * @Author: 吴锦辉
 * @Date: 2021-08-11 14:40:36
 * @LastEditTime: 2021-08-12 13:57:15
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header, Content } = Layout;

const menuConfig = [
  {
    name: '子应用about',
    path: '/about',
  },
];

export default function BasicLayout(props) {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[1]}>
          {menuConfig.map(v => (
            <Menu.Item key={v.path}>
              <Link to={v.path}>{v.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content>{props.children}</Content>
    </Layout>
  );
}
