/*
 * @Description: 应用文件
 * @Author: 吴锦辉
 * @Date: 2021-07-20 13:53:24
 * @LastEditTime: 2021-09-07 10:25:43
 */

import React, { useState, useCallback } from 'react';
import { ConfigForm, UploadWrap, CreateQRCode, Toast, List } from 'wjh-components';
import { Button } from 'antd';
import styles from './index.module.scss';

export default function WjhComponents() {
  const [showConfig, setShowConfig] = useState(() => ({
    favorite: false,
  }));

  const [data, setData] = useState([]);

  const configs = useCallback(
    form => {
      const rules = [{ required: true }];

      return [
        {
          cmpType: 'input',
          wrapProps: {
            name: 'name',
            label: '姓名',
            rules,
          },
        },
        {
          cmpType: 'input',
          wrapProps: {
            name: 'age',
            label: '年龄',
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
          cmpType: 'input',
          wrapProps: {
            name: 'weight',
            label: '身高',
            rules,
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
        {
          cmpType: 'rangepicker',
          wrapProps: {
            name: 'range',
            label: '范围',
            rules,
          },
        },
        {
          cmpType: 'radio',
          wrapProps: {
            name: 'color',
            label: '颜色',
            rules,
          },
          cmpProps: {
            options: [
              {
                label: '蓝',
                value: 1,
              },
              {
                label: '青',
                value: 2,
              },
            ],
            onChange: e => {
              form.setFieldsValue({
                favorite: undefined,
              });

              setShowConfig(pre => ({
                ...pre,
                favorite: e.target.value === 1,
              }));
            },
          },
        },
        {
          show: showConfig.favorite,
          cmpType: 'checkbox',
          wrapProps: {
            name: 'favorite',
            label: '喜爱',
            rules,
          },
          cmpProps: {
            options: [
              {
                label: '电影',
                value: 2,
              },
              {
                label: '游戏',
                value: 3,
              },
            ],
          },
        },
      ];
    },
    [showConfig]
  );

  const onShowToast = useCallback(() => {
    Toast.showToast({ title: '失败的toast显示，2s后隐藏', icon: 'fail' });
  }, []);

  const onShowModal = useCallback(() => {
    Toast.showModal({ content: 'Modal显示Modal显示Modal显示Modal显示' });
  }, []);

  const onShowLoading = useCallback(() => {
    Toast.showLoading({
      isMask: false,
    });
  }, []);

  const onHideLoading = useCallback(() => {
    Toast.hideLoading();
  }, []);

  const renderItem = useCallback((v, index) => {
    return (
      <div key={index} className={styles.item}>
        {index}
      </div>
    );
  }, []);

  const upDropEnd = useCallback(cb => {
    setTimeout(() => {
      setData(new Array(10).fill(1));

      cb();
    }, 1000);
  }, []);

  const downDropEnd = useCallback(
    (cb, noMoreCb) => {
      if (data.length >= 50) {
        noMoreCb();

        return;
      }

      setTimeout(() => {
        setData(pre => pre.concat(new Array(10).fill(1)));

        cb();
      }, 1000);
    },
    [data]
  );

  const BodyCmp = useCallback(props => {
    return <div className={styles.body}>{props.children}</div>;
  }, []);

  const upDropEndList = useCallback(cb => {
    setTimeout(() => {
      cb();
    }, 1000);
  }, []);

  return (
    <List.Pull upDropEnd={upDropEndList}>
      <div style={{ overflow: 'hidden' }}>
        <UploadWrap accept=".xls,.xlsx">
          <Button type="primary">上传文件</Button>
        </UploadWrap>
        <CreateQRCode />
        <ConfigForm configs={configs} col={3} gutter={[32, 8]} />
        <div className={styles.btnWrap}>
          <Button type="primary" className={styles.btn} onClick={onShowToast}>
            显示Toast
          </Button>
          <Button type="primary" className={styles.btn} onClick={onShowModal}>
            显示Modal
          </Button>
          <Button type="primary" className={styles.btn} onClick={onShowLoading}>
            显示Loading
          </Button>
          <Button type="primary" className={styles.btn} onClick={onHideLoading}>
            隐藏Loading
          </Button>
        </div>
        <List
          wrapStyle={{ height: '4rem' }}
          data={data}
          BodyCmp={BodyCmp}
          renderItem={renderItem}
          upDropEnd={upDropEnd}
          downDropEnd={downDropEnd}
        />
      </div>
    </List.Pull>
  );
}
