/*
 * @Description: 应用管理
 * @Author: 吴锦辉
 * @Date: 2021-09-24 21:58:03
 * @LastEditTime: 2021-09-25 17:31:06
 */

import React, { useEffect, useCallback, useMemo, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'antd';
import { ConfigTable } from 'wjh-components';
import { useShow, useHide, active, destory } from 'wjh-keepalive';
import apiCtrl from '@api';
import i18Ctrl from '@i18';

const defaultParams = {
  page: 1,
  pageSize: 10,
};

const path = '/main/application';

export default function ApplicationManage(props) {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [reqParms, setReqParams] = useState(defaultParams);
  const first = useRef(true);

  useEffect(() => {
    active(path);
  }, []);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }

    setLoading(true);

    const [, execute] = apiCtrl.post('/application/list', reqParms);

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

  useShow(() => {
    console.log('application show');
  }, path);

  useHide(pathname => {
    if (!pathname.includes(path)) {
      destory(path);
    }
  }, path);

  const configs = useCallback(() => {
    const rules = [{ required: false }];

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
    ];
  }, []);

  const columns = useMemo(
    () => [
      {
        title: i18Ctrl.formatterMessage('appid'),
        dataIndex: 'appid',
        render: (text, row) => {
          return (
            <Link to={`/main/application/details/${row.id}`} type="link">
              {row.appid}
            </Link>
          );
        },
      },
      {
        title: i18Ctrl.formatterMessage('name'),
        dataIndex: 'name',
      },
      {
        title: i18Ctrl.formatterMessage('developer'),
        dataIndex: 'development',
      },
      {
        title: i18Ctrl.formatterMessage('company'),
        dataIndex: 'company',
      },
      {
        title: i18Ctrl.formatterMessage('operate'),
        render: (text, row) => {
          return (
            <Link to={`/main/application/edit/${row.id}`} type="link">
              {i18Ctrl.formatterMessage('edit')}
            </Link>
          );
        },
      },
    ],
    []
  );

  const breadcrumbConfigs = useMemo(
    () => [
      {
        title: i18Ctrl.formatterMessage('applicationManagement'),
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

  const onCreateApplication = useCallback(() => {
    props.history.push('/main/application/create');
  }, [props]);

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
    >
      <div style={{ marginTop: '15px' }}>
        <Button type="primary" onClick={onCreateApplication}>
          创建
        </Button>
      </div>
    </ConfigTable>
  );
}
