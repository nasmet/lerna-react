/*
 * @Description: 应用文件
 * @Author: 吴锦辉
 * @Date: 2021-09-09 09:10:22
 * @LastEditTime: 2021-11-24 17:57:58
 */

import React, { useState, useCallback } from 'react';
import { Button } from 'antd';
import { Toast, List, VirtualList } from 'wjh-cmps-mobile';
import styles from './index.module.scss';

export default function WjhCmpsMobile() {
  const [data, setData] = useState([]);
  const [list] = useState(() => new Array(1000).fill(0).map((v, index) => index));

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
        {v}
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
        <VirtualList
          wrapStyle={{ height: '4rem' }}
          data={list}
          BodyCmp={BodyCmp}
          renderItem={renderItem}
        />
      </div>
    </List.Pull>
  );
}
