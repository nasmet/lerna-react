/*
 * @Description: 用户控制器
 * @Author: 吴锦辉
 * @Date: 2021-09-28 15:55:49
 * @LastEditTime: 2021-09-29 15:30:16
 */

const roomModel = require('../model/room');

class RoomController {
  constructor(mainCtrl) {
    this._mainCtrl = mainCtrl;
  }

  createRoom(data = {}) {
    return new Promise((resolve, reject) => {
      roomModel
        .createRoom(data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  selectRoom(data = {}) {
    return new Promise((resolve, reject) => {
      roomModel
        .selectRoom(data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateRoom(data = {}) {
    return new Promise((resolve, reject) => {
      roomModel
        .updateRoom(data)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = RoomController;
