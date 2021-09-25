/*
 * @Description: 应用模块
 * @Author: 吴锦辉
 * @Date: 2021-09-24 22:19:38
 * @LastEditTime: 2021-09-25 14:20:17
 */

const applicationModel = require('../model/application');

class ApplicationController {
  constructor(mainCtrl) {
    this._mainCtrl = mainCtrl;
  }

  createApplication(data = {}) {
    return new Promise((resolve, reject) => {
      applicationModel
        .createApplication(data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateApplication(data = {}) {
    return new Promise((resolve, reject) => {
      applicationModel
        .updateApplication(data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  selectApplication(data = {}) {
    return new Promise((resolve, reject) => {
      applicationModel
        .selectApplication(data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  selectApplicationByPage(data = {}) {
    return new Promise((resolve, reject) => {
      applicationModel
        .selectApplicationByPage(data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  selectApplicationCount() {
    return new Promise((resolve, reject) => {
      applicationModel
        .selectApplicationCount()
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = ApplicationController;
