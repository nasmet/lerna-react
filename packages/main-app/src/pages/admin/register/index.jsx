import React, { useCallback } from 'react';
import { ConfigForm } from 'wjh-components';
import { message } from 'antd';
import apiCtrl from '@api';
import i18Ctrl from '@i18';
import styles from './index.module.scss';

export default function Register(props) {
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
        tip: (
          <div style={{ color: '#666', textAlign: 'right' }}>
            {i18Ctrl.formatterMessage('accountTip')}
          </div>
        ),
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
        tip: (
          <div style={{ color: '#666', textAlign: 'right' }}>
            {i18Ctrl.formatterMessage('passwordTip')}
          </div>
        ),
      },
      {
        cmpType: 'input',
        wrapProps: {
          name: 'confirmPassword',
          label: i18Ctrl.formatterMessage('confirmPasswordAgain'),
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
        message.info(i18Ctrl.formatterMessage('passwordTip1'));

        return;
      }

      const [, execute] = apiCtrl.post('/user/register', {
        account,
        password,
      });

      execute.then(() => {
        message.info(i18Ctrl.formatterMessage('registerSuccess'));
        props.history.push('/admin/login');
      });
    },
    [props]
  );

  const onCancel = useCallback(() => {
    props.history.goBack();
  }, [props]);

  return (
    <div className={styles.content}>
      <div className={styles.title}>{i18Ctrl.formatterMessage('register')}</div>
      <ConfigForm
        formProps={{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }}
        configs={configs}
        col={1}
        gutter={[32, 8]}
        okText={i18Ctrl.formatterMessage('register')}
        cancelText={i18Ctrl.formatterMessage('return')}
        ok={onRegister}
        cancel={onCancel}
      />
    </div>
  );
}
