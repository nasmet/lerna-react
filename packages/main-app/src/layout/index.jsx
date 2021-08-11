import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

const { Header } = Layout;

const menuConfig = [
  {
    name: '主应用',
    path: '/',
  },
  {
    name: '子应用1',
    path: '/app1',
  },
  {
    name: '子应用2',
    path: '/app2',
  },
];

export default function BasicLayout() {
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
      {/* <Content style={{ padding: '0 50px' }}>Content</Content>
      <Footer style={{ textAlign: 'center' }}>Footer</Footer> */}
    </Layout>
  );
}
