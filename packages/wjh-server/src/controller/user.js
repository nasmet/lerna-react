/*
 * @Description: 用户控制器
 * @Author: 吴锦辉
 * @Date: 2021-09-14 13:59:45
 * @LastEditTime: 2021-09-15 15:18:50
 */

const { createUser, selectUser, selectAccount } = require('../model/user');

class UserController {
  constructor(mainCtrl) {
    this._mainCtrl = mainCtrl;
  }

  createUser(data = {}) {
    return new Promise((resolve, reject) => {
      createUser(data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  selectUser(data = {}) {
    return new Promise((resolve, reject) => {
      selectUser(data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  selectAccount(data = {}) {
    return new Promise((resolve, reject) => {
      selectAccount(data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = UserController;
