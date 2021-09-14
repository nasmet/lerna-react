import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ConfigForm } from 'wjh-components';
import HttpUtils from 'wjh-request';
import { message } from 'antd';
import styles from './index.module.scss';

const httpUtils = new HttpUtils({ baseURL: '/api' });

export default function Login() {
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

  const onLogin = useCallback(values => {
    const [, execute] = httpUtils.post('/user/login', values);

    execute
      .then(() => {
        message.info('登录成功');
      })
      .catch(err => {
        message.error(err);
      });
  }, []);

  return (
    <div className={styles.wrap}>
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
        <Link to="/user/register">注册</Link>
      </div>
    </div>
  );
}
