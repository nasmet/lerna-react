/*
 * @Description: 请求控制器
 * @Author: 吴锦辉
 * @Date: 2021-09-24 16:05:30
 * @LastEditTime: 2021-09-27 10:13:53
 */

import Taro from '@tarojs/taro';
import config from '@config';
import jumpCtrl from '@jump';
import cacheCtrl from '@cache';

class HttpController {
  config: {
    host: string;
    baseUrl: string;
    dataType: string;
    timeout: number;
    header: { 'content-type': string };
  };
  cancelRequestTaskQueue: Record<string, any>[];
  taskId: number;

  constructor(options: any = {}) {
    const { header = {}, ...other } = options;

    const defaultConfig = {
      host: config.host,
      baseUrl: '/api',
      dataType: 'json',
      timeout: 10 * 1000,
      header: {
        'content-type': 'application/json', // 默认值
        appid: config.appid,
      },
    };

    defaultConfig.header = { ...defaultConfig.header, ...header };

    this.config = { ...defaultConfig, ...other };

    this.cancelRequestTaskQueue = [];
    this.taskId = 1;

    const interceptor = function (chain) {
      const requestParams = chain.requestParams;

      console.log('requestParams: ', requestParams);

      return chain.proceed(requestParams).then(res => {
        return res;
      });
    };

    Taro.addInterceptor(interceptor);
  }

  _request(options) {
    const { url, data = {}, method } = options || {};

    let requestTask;

    const taskId = this.taskId++;

    const excute = new Promise((resolve, reject) => {
      const { baseUrl, dataType, timeout, header, host } = this.config;

      requestTask = Taro.request({
        url: host + baseUrl + url,
        data,
        header,
        dataType,
        timeout,
        method,
        success: res => {
          const { statusCode } = res;

          if (!/^2/.test(statusCode + '')) {
            Taro.showToast({
              title: '服务器错误',
              icon: 'none',
            });

            return;
          }

          switch (res.data.code) {
            case 0:
              resolve(res.data.data);
              return;
            case 4000:
              Taro.showToast({
                title: '身份验证失败，请重新登录',
                icon: 'none',
              });

              const { path, params } = Taro.getCurrentInstance().router || {};

              jumpCtrl.jumpBeforeLogin({
                targetUrl: path,
                targetOptions: params,
              });

              cacheCtrl.removeToken();

              Taro.redirectTo({
                url: 'main/login/login',
              });

              reject();
              return;
            default:
              Taro.showToast({
                title: res.data.message,
                icon: 'none',
              });

              reject(res.data.message);
              return;
          }
        },
        fail: err => {
          Taro.showToast({
            title: err.errMsg,
            icon: 'none',
          });

          reject(err.errMsg);
        },
        complete: () => {
          this.cancelRequestById(taskId, false);
        },
      });
    });

    this.cancelRequestTaskQueue.push({
      taskId,
      requestTask,
    });

    return [taskId, excute];
  }

  post(url, data = {}) {
    return this._request({
      url,
      data,
      method: 'POST',
    });
  }

  get(url, data = {}) {
    return this._request({
      url,
      data,
      method: 'GET',
    });
  }

  cancelRequestById(taskId, flag = true) {
    const len = this.cancelRequestTaskQueue.length;
    for (let i = 0; i < len; i += 1) {
      if (this.cancelRequestTaskQueue[i].taskId === taskId) {
        flag && this.cancelRequestTaskQueue[i].requestTask.abort();
        this.cancelRequestTaskQueue.splice(i, 1);
        break;
      }
    }
  }

  cancelAllRequestTask() {
    const len = this.cancelRequestTaskQueue.length;

    for (let i = 0; i < len; i += 1) {
      this.cancelRequestTaskQueue[i].requestTask.abort();
    }
    this.cancelRequestTaskQueue = [];
  }
}

export default new HttpController();
