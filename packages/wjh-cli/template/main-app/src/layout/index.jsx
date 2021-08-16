/*
 * @Description: 根路由组件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 08:53:39
 * @LastEditTime: 2021-08-16 08:53:46
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import styles from './index.module.scss';

const { Header, Content } = Layout;

const menuConfig = [
  {
    name: '主应用',
    path: '/',
  },
  {
    name: '主应用about',
    path: '/about',
  },
  {
    name: '子应用',
    path: '/child-app',
  },
];

export default function BasicLayout(props) {
  return (
    <Layout className="layout">
      <Header>
        <div className={styles.logo} />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[1]}>
          {menuConfig.map(v => (
            <Menu.Item key={v.path}>
              <Link to={v.path}>{v.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Header>
      <Content>
        {props.children}
        <div id="child-app" />
      </Content>
    </Layout>
  );
}
