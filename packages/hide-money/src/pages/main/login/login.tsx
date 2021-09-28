/*
 * @Description: 登录页
 * @Author: 吴锦辉
 * @Date: 2021-09-23 14:10:40
 * @LastEditTime: 2021-09-28 14:29:11
 */

import React, { useCallback, useEffect, useRef } from 'react';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import httpCtrl from '@api';
import cacheCtrl from '@cache';
import jumpCtrl from '@jump';
import { CustomButton } from '@component';
import styles from './login.module.scss';

let codeTimer;
/** wxcode有效期5分钟，单位毫秒 */
let codeValidTime = 5 * 60 * 1000;

export default function Login() {
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

        showLoading && Taro.showLoading();

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
    /** 已登录过 */
    if (cacheCtrl.getToken()) {
      Taro.redirectTo({
        url: '/pages/main/index/index',
      });

      return;
    }

    getWxCode();

    return () => {
      clearCodeTime && clearCodeTime();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onGetUserInfo = useCallback(() => {
    wx.getUserProfile({
      desc: '用于完善个人资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: res => {
        Taro.showLoading();

        const { userInfo } = res;

        const [, excute]: Array<any> = httpCtrl.post('/user/login', {
          wxCode: data.current.wxCode,
          ...userInfo,
        });

        excute
          .then(response => {
            cacheCtrl.setToken(response.token);

            cacheCtrl.setUserInfo(userInfo);

            jumpCtrl.jumpAfterLogin();

            Taro.hideLoading();
          })
          .catch(() => {
            getWxCode(false);
          });
      },
      fail: () => {
        Taro.showToast({
          title: '授权失败',
          icon: 'none',
        });
      },
    });
  }, [getWxCode]);

  return (
    <View className={styles.wrap}>
      <CustomButton className={styles.btn} btnText='登录' onClick={onGetUserInfo} />
    </View>
  );
}
