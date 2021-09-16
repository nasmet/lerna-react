/*
 * @Description: 用户控制器
 * @Author: 吴锦辉
 * @Date: 2021-09-14 13:59:45
 * @LastEditTime: 2021-09-16 17:39:40
 */

const {
  createUser,
  selectUser,
  selectAccount,
  selectUserByPage,
  selectUserCount,
} = require('../model/user');

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

  selectUserByPage(data = {}) {
    return new Promise((resolve, reject) => {
      selectUserByPage(data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  selectUserCount() {
    return new Promise((resolve, reject) => {
      selectUserCount()
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
