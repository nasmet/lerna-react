/*
 * @Description: 请求对象
 * @Author: 吴锦辉
 * @Date: 2021-09-15 11:26:27
 * @LastEditTime: 2021-09-16 14:46:55
 */

import { message } from 'antd';
import HttpUtils from 'wjh-request';
import cacheCtrl from '@cache';

const requestIntercept = configs => {
  configs.data = JSON.stringify(configs.data || {});
  configs.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  configs.headers.Authorization = `Bearer ${cacheCtrl.get('token') || ''}`;

  return configs;
};

const responseIntercept = res => {
  if (!/^2/.test(res.status)) {
    message.error(res.statusText);

    return Promise.reject(res.statusText);
  }

  switch (res.data.code) {
    case 0:
      return res.data.data;
    case 4000:
      message.info('身份验证失败，请重新登录！');

      window.history.replaceState(null, null, '/admin/login');

      return Promise.reject(res.data.message);
    default:
      message.error(res.data.message);

      return Promise.reject(res.data.message);
  }
};

export default new HttpUtils({ baseURL: '/api', requestIntercept, responseIntercept });
