import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, message } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, DownOutlined } from '@ant-design/icons';
import { registerMicroApps } from 'qiankun';
import apiCtrl from '@api';
import cacheCtrl from '@cache';
import styles from './index.module.scss';

registerMicroApps([
  {
    name: 'child-app-operation',
    entry: '//localhost:8081',
    container: '#child-app-operation',
    activeRule: '/main/:business/operation',
  },
]);

const { SubMenu } = Menu;

export default function Layout(props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.aside}>
        <Aside {...props} />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <Header {...props} />
        </div>
        <div className={styles.main}>
          {props.children}
          <div id="child-app-operation" />
        </div>
      </div>
    </div>
  );
}

function Header(props) {
  const onLoginOut = useCallback(() => {
    const [, execute] = apiCtrl.post('/user/loginout');

    execute.then(() => {
      cacheCtrl.remove('token');

      props.history.replace('/admin/login');

      message.info('登出成功');
    });
  }, [props]);

  const menu = useMemo(
    () => (
      <Menu>
        <Menu.Item key="1" onClick={onLoginOut}>
          退出登录
        </Menu.Item>
        <Menu.Item key="2">用户信息</Menu.Item>
      </Menu>
    ),
    [onLoginOut]
  );

  return (
    <Dropdown overlay={menu}>
      <span>
        nasmet
        <DownOutlined />
      </span>
    </Dropdown>
  );
}

function Aside(props) {
  return (
    <Menu mode="vertical">
      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="应用">
        <Menu.Item key="5">快来找钱吧</Menu.Item>
        <Menu.Item key="6">来奔现吧</Menu.Item>
      </SubMenu>
      <SubMenu key="sub1" icon={<MailOutlined />} title="运营模块">
        <Menu.Item key="1">
          <Link to="/main/middle/operation/user/list">用户管理</Link>
        </Menu.Item>
        <Menu.Item key="2">Option 2</Menu.Item>
        <Menu.ItemGroup title="Item 2">
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </Menu.ItemGroup>
      </SubMenu>
    </Menu>
  );
}
