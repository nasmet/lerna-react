/*
 * @Description: 用户控制器
 * @Author: 吴锦辉
 * @Date: 2021-09-14 13:59:45
 * @LastEditTime: 2021-09-28 15:34:57
 */

const userModel = require('../model/user');

class UserController {
  constructor(mainCtrl) {
    this._mainCtrl = mainCtrl;
  }

  createUser(data = {}) {
    return new Promise((resolve, reject) => {
      userModel
        .createUser(data)
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
      userModel
        .selectUser(data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateUser(data = {}) {
    return new Promise((resolve, reject) => {
      userModel
        .updateUser(data)
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
      userModel
        .selectUserByPage(data)
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
      userModel
        .selectUserCount()
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  deleteUser(data = {}) {
    return new Promise((resolve, reject) => {
      userModel
        .deleteUser(data)
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
