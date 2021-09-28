/*
 * @Description: 主控制
 * @Author: 吴锦辉
 * @Date: 2021-09-15 15:02:44
 * @LastEditTime: 2021-09-28 15:57:40
 */

const SessionController = require('./session');
const UserController = require('./user');
const RoomController = require('./room');

class MainController {
  constructor() {
    this.sessionController = new SessionController(this);
    this.userController = new UserController(this);
    this.roomController = new RoomController(this);
  }

  getSessionCtrl() {
    return this.sessionController;
  }

  getUserCtrl() {
    return this.userController;
  }

  getRoomCtrl() {
    return this.roomController;
  }
}

module.exports = new MainController();
