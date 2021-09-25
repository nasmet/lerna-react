/*
 * @Description: 主控制
 * @Author: 吴锦辉
 * @Date: 2021-09-15 15:02:44
 * @LastEditTime: 2021-09-24 22:26:06
 */

const SessionController = require('./session');
const UserController = require('./user');
const ApplicationController = require('./application');

class MainController {
  constructor() {
    this.sessionController = new SessionController(this);
    this.userController = new UserController(this);
    this.applicationController = new ApplicationController(this);
  }

  getSessionCtrl() {
    return this.sessionController;
  }

  getUserCtrl() {
    return this.userController;
  }

  getApplicationCtrl() {
    return this.applicationController;
  }
}

module.exports = new MainController();
