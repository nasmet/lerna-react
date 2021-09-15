import React, { useCallback } from 'react';
import { ConfigForm } from 'wjh-components';
import { message } from 'antd';
import apiCtrl from '@api';
import styles from './index.module.scss';

export default function Register(props) {
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
      {
        cmpType: 'input',
        wrapProps: {
          name: 'confirmPassword',
          label: '再次确认密码',
          rules,
        },
        cmpProps: {
          type: 'password',
        },
      },
    ];
  }, []);

  const onRegister = useCallback(
    values => {
      const { account, password, confirmPassword } = values;

      if (password !== confirmPassword) {
        message.info('两次输入的密码不一致！');

        return;
      }

      const [, execute] = apiCtrl.post('/user/register', {
        account,
        password,
      });

      execute
        .then(() => {
          message.info('注册成功');

          props.history.push('/user/login');
        })
        .catch(err => {
          message.error(err);
        });
    },
    [props]
  );

  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        <div className={styles.title}>注册</div>
        <ConfigForm
          formProps={{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }}
          configs={configs}
          col={1}
          gutter={[32, 8]}
          okText="注册"
          showCancelBtn={false}
          ok={onRegister}
        />
      </div>
    </div>
  );
}
