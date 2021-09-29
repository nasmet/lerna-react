import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { ConfigTable } from 'wjh-components';
import apiCtrl from '@api';
import { formatterMessage } from '@i18';

const defaultParams = {
  page: 1,
  pageSize: 10,
};

export default function List() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reqParms, setReqParams] = useState(defaultParams);

  useEffect(() => {
    setLoading(true);

    const [, execute] = apiCtrl.post('/operation/user/list', reqParms);

    execute
      .then(res => {
        const { list, total } = res;

        setData(list);
        setTotal(total);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [reqParms]);

  const configs = useCallback(() => {
    const rules = [{ required: false }];

    return [
      {
        cmpType: 'input',
        wrapProps: {
          name: 'nickName',
          label: formatterMessage('nickName'),
          rules,
        },
      },
      {
        cmpType: 'select',
        wrapProps: {
          name: 'gender',
          label: formatterMessage('gender'),
          rules,
        },
        cmpProps: {
          options: [
            {
              label: formatterMessage('man'),
              value: 1,
            },
            {
              label: formatterMessage('woman'),
              value: 2,
            },
          ],
        },
      },
      {
        cmpType: 'datepicker',
        wrapProps: {
          name: 'date',
          label: formatterMessage('birthday'),
          rules,
        },
      },
    ];
  }, []);

  const columns = useMemo(
    () => [
      {
        title: formatterMessage('username'),
        dataIndex: 'username',
      },
      {
        title: formatterMessage('gender'),
        dataIndex: 'gender',
      },
      {
        title: formatterMessage('birthday'),
        dataIndex: 'birthday',
      },
      {
        title: formatterMessage('createTime'),
        dataIndex: 'createTime',
        render: (text, row) => {
          return moment(row.createTime).format('YYYY-MM-DD HH:mm:ss');
        },
      },
    ],
    []
  );

  const breadcrumbConfigs = useMemo(
    () => [
      {
        title: formatterMessage('user'),
      },
      {
        title: formatterMessage('list'),
      },
    ],
    []
  );

  const onSearch = useCallback(values => {
    console.log(values);

    setReqParams(pre => ({ ...pre, ...values }));
  }, []);

  const onReset = useCallback(() => {
    setReqParams(() => ({ ...defaultParams }));
  }, []);

  return (
    <ConfigTable
      breadcrumbConfigs={breadcrumbConfigs}
      searchConfigs={configs}
      columns={columns}
      dataSource={data}
      total={total}
      loading={loading}
      onSearch={onSearch}
      onReset={onReset}
    />
  );
}
