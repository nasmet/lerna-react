/*
 * @Description: 应用管理
 * @Author: 吴锦辉
 * @Date: 2021-09-24 21:58:03
 * @LastEditTime: 2021-09-25 14:31:37
 */

import React, { useEffect, useCallback, useMemo, useState, useRef } from 'react';
import { Button, message, Modal, Spin } from 'antd';
import { ConfigForm } from 'wjh-components';
import apiCtrl from '@api';
import i18Ctrl from '@i18';

export default function ApplicationDetails(props) {
  const { did, eid } = props.match.params;

  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    let url;
    const data = {};

    if (did || eid) {
      url = '/application/details';
      data.id = did || eid;
    }

    if (!url) {
      return;
    }

    setLoading(true);

    const [, execute] = apiCtrl.post(url, data);

    execute
      .then(res => {
        formRef.current.setFieldsValue(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [did, eid]);

  const breadcrumbConfigs = useMemo(() => {
    let title = 'create';

    if (did) {
      title = 'details';
    }

    if (eid) {
      title = 'edit';
    }

    return [
      {
        title: i18Ctrl.formatterMessage('applicationManagement'),
        path: '/main/application',
      },
      {
        title: i18Ctrl.formatterMessage(title),
      },
    ];
  }, [did, eid]);

  const showOkBtn = useMemo(() => {
    let show = true;

    if (did) {
      show = false;
    }

    return show;
  }, [did]);

  const configs = useCallback(form => {
    formRef.current = form;

    const rules = [{ required: true }];

    return [
      {
        cmpType: 'input',
        wrapProps: {
          name: 'appid',
          label: i18Ctrl.formatterMessage('appid'),
          rules,
        },
      },
      {
        cmpType: 'input',
        wrapProps: {
          name: 'name',
          label: i18Ctrl.formatterMessage('name'),
          rules,
        },
      },
      {
        cmpType: 'input',
        wrapProps: {
          name: 'development',
          label: i18Ctrl.formatterMessage('developer'),
        },
      },
      {
        cmpType: 'input',
        wrapProps: {
          name: 'company',
          label: i18Ctrl.formatterMessage('company'),
        },
      },
      {
        cmpType: 'textarea',
        wrapProps: {
          name: 'desc',
          label: i18Ctrl.formatterMessage('desc'),
        },
      },
    ];
  }, []);

  const onSubmit = useCallback(
    values => {
      setLoading(true);

      let url = '/application/create';
      let tip = 'createSuccess';
      values = { ...values };

      if (eid) {
        url = '/application/update';
        tip = 'editSuccess';
        values.id = eid;
      }

      const [, execute] = apiCtrl.post(url, values);

      execute
        .then(() => {
          message.success(i18Ctrl.formatterMessage(tip));
          props.history.goBack();
        })
        .catch(() => {
          setLoading(false);
        });
    },
    [props.history, eid]
  );

  const onCancel = useCallback(() => {
    props.history.goBack();
  }, [props.history]);

  return (
    <Spin spinning={loading}>
      <div style={{ maxWidth: '500px' }}>
        <ConfigForm
          formProps={{ labelCol: { span: 8 }, wrapperCol: { span: 16 } }}
          configs={configs}
          showBreadcrumb
          breadcrumbConfigs={breadcrumbConfigs}
          showOkBtn={showOkBtn}
          ok={onSubmit}
          cancel={onCancel}
        />
      </div>
    </Spin>
  );
}
