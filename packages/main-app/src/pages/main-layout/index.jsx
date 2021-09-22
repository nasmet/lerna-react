import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, message } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, DownOutlined } from '@ant-design/icons';
import { registerMicroApps } from 'qiankun';
import { theme } from 'wjh-util';
import apiCtrl from '@api';
import cacheCtrl from '@cache';
import themeConfig from '@theme';
import i18Ctrl from '@i18';
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
          {i18Ctrl.formatterMessage('signOut')}
        </Menu.Item>
      </Menu>
    ),
    [onLoginOut]
  );

  const onChangeLanguage = useCallback(key => {
    i18Ctrl.switchLanguage(key);
  }, []);

  const i18Menu = useMemo(
    () => (
      <Menu>
        <Menu.Item key="1" onClick={() => onChangeLanguage('zh-cn')}>
          Chinese
        </Menu.Item>
        <Menu.Item key="2" onClick={() => onChangeLanguage('en')}>
          English
        </Menu.Item>
      </Menu>
    ),
    [onChangeLanguage]
  );

  const onChangeTheme = useCallback(key => {
    theme.changeTheme(themeConfig[key]);
  }, []);

  const themeMenu = useMemo(
    () => (
      <Menu>
        <Menu.Item key="1" onClick={() => onChangeTheme('default')}>
          默认
        </Menu.Item>
        <Menu.Item key="2" onClick={() => onChangeTheme('orange')}>
          橘黄色
        </Menu.Item>
      </Menu>
    ),
    [onChangeTheme]
  );

  return (
    <>
      <Dropdown overlay={i18Menu}>
        <span>
          {i18Ctrl.formatterMessage('globalization')}
          <DownOutlined />
        </span>
      </Dropdown>
      <Dropdown overlay={themeMenu}>
        <span style={{ marginLeft: '20px', display: 'inline-block' }}>
          {i18Ctrl.formatterMessage('themeColor')}
          <DownOutlined />
        </span>
      </Dropdown>
      <Dropdown overlay={menu}>
        <span style={{ marginLeft: '20px', display: 'inline-block' }}>
          nasmet
          <DownOutlined />
        </span>
      </Dropdown>
    </>
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
