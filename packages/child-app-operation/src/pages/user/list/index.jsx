import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { Button, message, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { ConfigTable } from 'wjh-components';
import apiCtrl from '@api';

export default function List(props) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reqParms, setReqParams] = useState(() => ({
    page: 1,
    pageSize: 10,
  }));

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
          label: '账号',
          rules,
        },
      },
      {
        cmpType: 'input',
        wrapProps: {
          name: 'username',
          label: '用户名',
          rules,
        },
      },
      {
        cmpType: 'select',
        wrapProps: {
          name: 'gender',
          label: '性别',
          rules,
        },
        cmpProps: {
          options: [
            {
              label: '男',
              value: 1,
            },
            {
              label: '女',
              value: 2,
            },
          ],
        },
      },
      {
        cmpType: 'datepicker',
        wrapProps: {
          name: 'date',
          label: '出生日期',
          rules,
        },
      },
    ];
  }, []);

  const onDeleteUser = useCallback(id => {
    Modal.confirm({
      title: '温馨提示',
      icon: <ExclamationCircleOutlined />,
      content: '确认删除?',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const [, execute] = apiCtrl.post('/user/delete', { id });

        execute.then(() => {
          message.success('删除成功');

          setReqParams(pre => ({ ...pre }));
        });
      },
    });
  }, []);

  const columns = useMemo(
    () => [
      {
        title: '账号',
        dataIndex: 'account',
      },
      {
        title: '年龄',
        dataIndex: 'age',
      },
      {
        title: '操作',
        render: (text, row, index) => {
          return (
            <div>
              <Button type="link">编辑</Button>
              <Button type="text">冻结</Button>
              <Button type="text" danger onClick={() => onDeleteUser(row.id)}>
                删除
              </Button>
            </div>
          );
        },
      },
    ],
    [onDeleteUser]
  );

  const onSearch = useCallback(values => {
    console.log(values);

    setReqParams(pre => ({ ...pre, ...values }));
  }, []);

  return (
    <ConfigTable
      searchConfigs={configs}
      columns={columns}
      dataSource={data}
      total={total}
      loading={loading}
      onSearch={onSearch}
    />
  );
}
