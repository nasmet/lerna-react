import 'antd/dist/antd.min.css';
import React, { useMemo, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown, message } from 'antd';
import {
  MailOutlined,
  AppstoreOutlined,
  DownOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { registerMicroApps } from 'qiankun';
import { theme } from 'wjh-util';
import classNames from 'classnames';
import apiCtrl from '@api';
import cacheCtrl from '@cache';
import themeConfig from '@theme';
import i18Ctrl from '@i18';
import config from '@config';
import styles from './index.module.scss';

registerMicroApps([
  {
    name: 'child-app-operation',
    entry: `//${config.ip}:8081`,
    container: '#child-app-operation',
    activeRule: '/main/:business/operation',
  },
]);

const { SubMenu } = Menu;

export default function Layout(props) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={styles.wrap}>
      <div
        className={classNames(styles.aside, {
          [styles.collapsed]: collapsed,
        })}
      >
        <Aside {...props} />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <div onClick={() => setCollapsed(pre => !pre)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>

          <div>
            <Header {...props} />
          </div>
        </div>
        <div className={styles.main}>
          {props.children ? (
            <div style={{ padding: '20px' }}>
              {props.children} <div id="child-app-operation" />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Header(props) {
  const onLoginOut = useCallback(() => {
    const [, execute] = apiCtrl.post('/user/loginout');

    execute.then(() => {
      cacheCtrl.removeToken();

      props.history.replace('/admin/login');

      message.info(i18Ctrl.formatterMessage('signOutSuccess'));
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

  const themeMenu = (
    <Menu>
      <Menu.Item key="1" onClick={() => onChangeTheme('default')}>
        {i18Ctrl.formatterMessage('default')}
      </Menu.Item>
      <Menu.Item key="2" onClick={() => onChangeTheme('orange')}>
        {i18Ctrl.formatterMessage('orange')}
      </Menu.Item>
    </Menu>
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

function Aside() {
  const [applictionData, setApplicationData] = useState([]);
  const [appid, setAppid] = useState('');

  useEffect(() => {
    const [, execute] = apiCtrl.post('/application/list', { page: 1, pageSize: 10 });

    execute.then(res => {
      const { list } = res;

      setApplicationData(list);
    });
  }, []);

  const onApplicationChange = useCallback(appid => {
    cacheCtrl.setAppid(appid);

    setAppid(appid);
  }, []);

  return (
    <Menu mode="vertical">
      <SubMenu
        key="sub2"
        icon={<AppstoreOutlined />}
        title={i18Ctrl.formatterMessage('application')}
      >
        {applictionData.map(v => (
          <Menu.Item key={v.id} onClick={() => onApplicationChange(v.appid)}>
            {v.name}
          </Menu.Item>
        ))}
      </SubMenu>
      <Menu.Item icon={<AppstoreOutlined />} key="sub0">
        <Link to="/main/application">{i18Ctrl.formatterMessage('applicationManagement')}</Link>
      </Menu.Item>
      <SubMenu
        key="sub1"
        icon={<MailOutlined />}
        title={i18Ctrl.formatterMessage('operationModule')}
      >
        <Menu.Item key="1">
          <Link to={`/main/${appid}/operation/user/list`}>
            {i18Ctrl.formatterMessage('userManagement')}
          </Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}
