import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ConfigForm } from 'wjh-components';
import { message } from 'antd';
import apiCtrl from '@api';
import cacheCtrl from '@cache';
import styles from './index.module.scss';

export default function Login(props) {
  const configs = useCallback(() => {
    const rules = [{ required: true }];

    return [
      {
        cmpType: 'input',
        wrapProps: {
          name: 'account',
          label: '账号',
          rules,
        },
      },
      {
        cmpType: 'input',
        wrapProps: {
          name: 'password',
          label: '密码',
          rules,
        },
        cmpProps: {
          type: 'password',
        },
      },
    ];
  }, []);

  const onLogin = useCallback(
    values => {
      const [, execute] = apiCtrl.post('/user/login', values);

      execute.then(res => {
        const { token } = res || {};

        cacheCtrl.setToken(token);

        props.history.replace('/main');

        message.info('登录成功');
      });
    },
    [props]
  );

  return (
    <div className={styles.content}>
      <div className={styles.title}>登录</div>
      <ConfigForm
        configs={configs}
        col={1}
        gutter={[32, 8]}
        okText="登录"
        showCancelBtn={false}
        ok={onLogin}
      />
      <Link to="/admin/register">注册</Link>
    </div>
  );
}
