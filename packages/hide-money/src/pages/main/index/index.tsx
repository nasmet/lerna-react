/*
 * @Description: 登录页
 * @Author: 吴锦辉
 * @Date: 2021-09-23 14:10:40
 * @LastEditTime: 2021-09-26 17:35:04
 */

import React, { useCallback, useEffect, useRef } from 'react';
import Taro from '@tarojs/taro';
import { View, Button } from '@tarojs/components';
import httpCtrl from '@api';
import styles from './index.module.scss';
import iconCover from '../img/icon-cover.png';
import iconBtn from '../img/icon-btn.png';

let codeTimer;
/** wxcode有效期5分钟，单位毫秒 */
let codeValidTime = 5 * 60 * 1000;

export default function Index() {
  const data = useRef<Record<string, any>>({});

  const clearCodeTime = useCallback(() => {
    if (codeTimer) {
      clearTimeout(codeTimer);
      codeTimer = '';
    }
  }, []);

  /** 获取WxCode */
  const getWxCode = useCallback(
    (showLoading = true) => {
      return new Promise((resolve, reject) => {
        clearCodeTime();

        const message = () => {
          Taro.showToast({
            title: '获取wxCode失败，请重启应用',
            icon: 'none',
          });
        };

        showLoading &&
          Taro.showLoading({
            title: '',
          });

        Taro.login({
          success: res => {
            const { code } = res;

            if (code) {
              showLoading && Taro.hideLoading();

              data.current.wxCode = code;

              codeTimer = setTimeout(() => {
                getWxCode(false);
              }, codeValidTime);

              resolve(code);
            } else {
              message();

              reject();
            }
          },
          fail: () => {
            message();

            reject();
          },
        });
      });
    },
    [clearCodeTime]
  );

  useEffect(() => {
    getWxCode();

    return () => {
      clearCodeTime && clearCodeTime();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGetUserInfo = useCallback(e => {
    if (!e.detail) {
      Taro.showToast({
        title: '授权失败',
        icon: 'none',
      });

      return;
    }

    const { encryptedData, iv, userInfo } = e.detail;

    const [, excute]: Array<any> = httpCtrl.post('/user/login', {
      wxCode: data.current.wxCode,
      encryptedData,
      iv,
      ...userInfo,
    });

    excute.then(res => {});
  }, []);

  return (
    <View className={styles.wrap} style={{ backgroundImage: `url(${iconCover})` }}>
      <Button
        className={styles.btn}
        openType='getUserInfo'
        onGetUserInfo={onGetUserInfo}
        style={{ backgroundImage: `url(${iconBtn})` }}
      >
        开 始
      </Button>
    </View>
  );
}
