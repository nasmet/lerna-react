import React, { useCallback } from 'react';
import { ConfigForm } from 'wjh-components';
import { message } from 'antd';
import apiCtrl from '@api';
import cacheCtrl from '@cache';
import routerJumpCtrl from '@routerjump';
import i18Ctrl from '@i18';
import styles from './index.module.scss';

export default function Login() {
  const configs = useCallback(() => {
    const rules = [{ required: true }];

    return [
      {
        cmpType: 'input',
        wrapProps: {
          name: 'account',
          label: i18Ctrl.formatterMessage('account'),
          rules,
        },
      },
      {
        cmpType: 'input',
        wrapProps: {
          name: 'password',
          label: i18Ctrl.formatterMessage('password'),
          rules,
        },
        cmpProps: {
          type: 'password',
        },
      },
    ];
  }, []);

  const onLogin = useCallback(values => {
    const [, execute] = apiCtrl.post('/user/login', values);

    execute.then(res => {
      const { token } = res || {};

      cacheCtrl.setToken(token);

      routerJumpCtrl.jumpAfterLogin();

      message.info('登录成功');
    });
  }, []);

  return (
    <div className={styles.content}>
      <div className={styles.title}>{i18Ctrl.formatterMessage('login')}</div>
      <ConfigForm
        configs={configs}
        col={1}
        gutter={[32, 8]}
        okText="登录"
        showCancelBtn={false}
        ok={onLogin}
      />
    </div>
  );
}
