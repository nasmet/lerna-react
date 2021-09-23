import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { Button, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ConfigTable } from 'wjh-components';
import apiCtrl from '@api';
import { formatterMessage } from '@i18';

const defaultParams = {
  page: 1,
  pageSize: 10,
};

export default function List(props) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reqParms, setReqParams] = useState(defaultParams);

  useEffect(() => {
    setLoading(true);

    const [, execute] = apiCtrl.post('/user/list', reqParms);

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

  const configs = useCallback(form => {
    const rules = [{ required: false }];

    return [
      {
        cmpType: 'input',
        wrapProps: {
          name: 'account',
          label: formatterMessage('account'),
          rules,
        },
      },
      {
        cmpType: 'input',
        wrapProps: {
          name: 'username',
          label: formatterMessage('username'),
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

  const onDeleteUser = useCallback(id => {
    Modal.confirm({
      title: formatterMessage('tips'),
      icon: <ExclamationCircleOutlined />,
      content: formatterMessage('confirmDeletion'),
      okText: formatterMessage('confirm'),
      cancelText: formatterMessage('cancel'),
      onOk: () => {
        const [, execute] = apiCtrl.post('/user/delete', { id });

        execute.then(() => {
          message.success(formatterMessage('successfullyDeleted'));

          setReqParams(pre => ({ ...pre }));
        });
      },
    });
  }, []);

  const columns = useMemo(
    () => [
      {
        title: formatterMessage('account'),
        dataIndex: 'account',
      },
      {
        title: formatterMessage('operate'),
        render: (text, row, index) => {
          return (
            <div>
              <Button type="link">{formatterMessage('edit')}</Button>
              <Button type="text" danger onClick={() => onDeleteUser(row.id)}>
                {formatterMessage('delete')}
              </Button>
            </div>
          );
        },
      },
    ],
    [onDeleteUser]
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
