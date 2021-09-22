/*
 * @Description: 基于axios二次封装的网络请求库
 * @Author: 吴锦辉
 * @Date: 2021-08-16 14:15:35
 * @LastEditTime: 2021-09-22 09:07:17
 */

import axios from 'axios';
import defaultConfig from './config';

class HttpUtils {
  constructor(options = {}) {
    const config = { ...defaultConfig, ...options };

    const { timeout, baseURL, requestIntercept, responseIntercept, responseError } = config;

    this.instancse = axios.create();
    this.instancse.defaults.timeout = timeout;
    this.instancse.defaults.baseURL = baseURL;
    this.cancelRequestTaskQueue = [];
    this.taskId = 1;

    // 请求拦截器（所有发送的请求都要从这儿过一次)
    this.instancse.interceptors.request.use(requestIntercept, error => {
      return Promise.reject(error.message);
    });

    // 响应拦截器（所有接收到的请求都要从这儿过一次）
    this.instancse.interceptors.response.use(responseIntercept, error => {
      responseError && responseError(error.message);
      return Promise.reject(error.message);
    });
  }

  _request(fn, url, params) {
    let arg;
    let cancelRequestTask;
    const cancelToken = new axios.CancelToken(function executor(c) {
      cancelRequestTask = c;
    });

    if (fn === this.instancse.get || fn === this.instancse.delete) {
      arg = [
        {
          params,
          cancelToken,
        },
      ];
    } else {
      arg = [
        params,
        {
          cancelToken,
        },
      ];
    }

    this.taskId += 1;
    const { taskId } = this;

    this.cancelRequestTaskQueue.push({
      taskId,
      execute: cancelRequestTask,
    });

    return [
      taskId,
      new Promise((resolve, reject) => {
        fn(url, ...arg)
          .then(res => {
            resolve(res);
          })
          .catch(e => {
            if (this._isCancel(e)) {
              reject();

              return;
            }
            reject(e);
          })
          .finally(() => {
            this.cancelRequestById(taskId);
          });
      }),
    ];
  }

  // eslint-disable-next-line class-methods-use-this
  _isCancel(err) {
    return err === 'CANCELREQUEST';
  }

  get(url, params = {}) {
    return this._request(this.instancse.get, url, params);
  }

  del(url, params = {}) {
    return this._request(this.instancse.delete, url, params);
  }

  post(url, params = {}) {
    return this._request(this.instancse.post, url, params);
  }

  put(url, params = {}) {
    return this._request(this.instancse.put, url, params);
  }

  cancelRequestById(taskId) {
    const len = this.cancelRequestTaskQueue.length;
    for (let i = 0; i < len; i += 1) {
      if (this.cancelRequestTaskQueue[i].taskId === taskId) {
        this.cancelRequestTaskQueue[i].execute();
        this.cancelRequestTaskQueue.splice(i, 1);
        break;
      }
    }
  }

  cancelAllRequestTask() {
    const len = this.cancelRequestTaskQueue.length;

    for (let i = 0; i < len; i += 1) {
      this.cancelRequestTaskQueue[i].execute();
    }
    this.cancelRequestTaskQueue = [];
  }
}

export default HttpUtils;
