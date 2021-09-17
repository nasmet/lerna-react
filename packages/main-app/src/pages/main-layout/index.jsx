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
        <Aside />
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

function Aside() {
  return (
    <Menu mode="vertical">
      <SubMenu key="sub2" icon={<AppstoreOutlined />} title="业务">
        <Menu.Item key="5">Option 5</Menu.Item>
        <Menu.Item key="6">Option 6</Menu.Item>
        <SubMenu key="sub3" title="Submenu">
          <Menu.Item key="7">Option 7</Menu.Item>
          <Menu.Item key="8">Option 8</Menu.Item>
        </SubMenu>
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
      <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
        <Menu.Item key="9">Option 9</Menu.Item>
        <Menu.Item key="10">Option 10</Menu.Item>
        <Menu.Item key="11">Option 11</Menu.Item>
        <Menu.Item key="12">Option 12</Menu.Item>
      </SubMenu>
    </Menu>
  );
}
