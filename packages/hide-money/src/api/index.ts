/*
 * @Description: 请求控制器
 * @Author: 吴锦辉
 * @Date: 2021-09-24 16:05:30
 * @LastEditTime: 2021-09-26 11:57:43
 */

import Taro from '@tarojs/taro';

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
      host: 'http://127.0.0.0:3001',
      baseUrl: '/api-hidemoney',
      dataType: 'json',
      timeout: 10 * 1000,
      header: {
        'content-type': 'application/json', // 默认值
        Appid: 'wx3d9ec401e55391fa',
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

  post(url, data = {}) {
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
        success: res => {
          const { statusCode, errMsg } = res;

          if (!/^2/.test(statusCode + '')) {
            Taro.showToast({
              title: errMsg,
              icon: 'none',
            });

            return;
          }

          switch (res.data.code) {
            case 0:
              resolve(res.data.data);
              return;
            case 4000:
              reject();
              return;
            default:
              reject();
              return;
          }
        },
        fail: errMsg => {
          reject(errMsg);
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
