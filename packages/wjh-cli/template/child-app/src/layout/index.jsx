/*
 * @Description: 根路由组件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:24:44
 * @LastEditTime: 2021-08-16 09:24:44
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
