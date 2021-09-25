/*
 * @Description: 用户控制器
 * @Author: 吴锦辉
 * @Date: 2021-09-14 13:59:45
 * @LastEditTime: 2021-09-25 17:10:39
 */

const userModel = require('../model/user');

class UserController {
  constructor(mainCtrl) {
    this._mainCtrl = mainCtrl;
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
}

module.exports = UserController;
