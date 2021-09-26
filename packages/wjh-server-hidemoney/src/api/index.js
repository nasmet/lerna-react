/*
 * @Description: 微信请求接口封装
 * @Author: 吴锦辉
 * @Date: 2021-09-15 11:26:27
 * @LastEditTime: 2021-09-26 17:35:20
 */

const HttpUtils = require('wjh-request');

const requestIntercept = configs => {
  const { data } = configs;
  configs.data = JSON.stringify(data || {});
  configs.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  return configs;
};

const responseIntercept = res => {
  if (!/^2/.test(res.status)) {
    return Promise.reject(new Error(res.statusText));
  }

  return res.data;
};

const responseError = err => {
  return Promise.reject(err);
};

// eslint-disable-next-line new-cap
const httpCtrl = new HttpUtils.default({
  baseURL: 'https://api.weixin.qq.com',
  requestIntercept,
  responseIntercept,
  responseError,
});

module.exports = httpCtrl;
