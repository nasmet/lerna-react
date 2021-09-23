/*
 * @Description: 请求对象
 * @Author: 吴锦辉
 * @Date: 2021-09-15 11:26:27
 * @LastEditTime: 2021-09-22 18:01:29
 */

import { message } from 'antd';
import HttpUtils from 'wjh-request';
import { ThrottleRequest } from 'wjh-util';
import cacheCtrl from '@cache';
import routerJumpCtrl from '@routerjump';
import i18Ctrl from '@i18';

const baseURL = '/api';

const nocheckSession = ['/user/login', '/user/register'];

const throttleRequest = new ThrottleRequest();

const requestIntercept = configs => {
  const { url, data } = configs;

  configs.data = JSON.stringify(data || {});
  configs.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const token = cacheCtrl.getToken();

  if (throttleRequest.has(url)) {
    return Promise.reject(new Error(''));
  }

  if (!nocheckSession.includes(url) && !token) {
    const { pathname, query } = window.location;

    routerJumpCtrl.jumpBeforeLogin({
      targetUrl: pathname,
      targetOptions: query,
    });

    window.history.replaceState(null, null, '/admin/login');

    return Promise.reject(new Error(i18Ctrl.formatterMessage('tokenInvalid')));
  }

  configs.headers.Authorization = `Bearer ${token || ''}`;

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
      message.info(i18Ctrl.formatterMessage('tokenInvalid'));

      // eslint-disable-next-line no-case-declarations
      const { pathname, query } = window.location;

      routerJumpCtrl.jumpBeforeLogin({
        targetUrl: pathname,
        targetOptions: query,
      });

      cacheCtrl.removeToken();

      window.history.replaceState(null, null, '/admin/login');

      return Promise.reject(res.data.message);
    default:
      message.error(res.data.message);

      return Promise.reject(res.data.message);
  }
};

const responseError = err => {
  if (err) {
    message.error(err);
  }
};

const httpCtrl = new HttpUtils({
  baseURL,
  requestIntercept,
  responseIntercept,
  responseError,
});

window.httpCtrl = httpCtrl;

export default httpCtrl;
