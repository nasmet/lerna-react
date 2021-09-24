/*
 * @Description: 会话控制层
 * @Author: 吴锦辉
 * @Date: 2021-09-14 09:35:58
 * @LastEditTime: 2021-09-15 15:19:05
 */

class SessionController {
  constructor(mainCtrl) {
    this._mainCtrl = mainCtrl;
    this.sessionMap = new Map();
  }

  generateSession(useId) {
    const token = useId + Date.now();

    this.sessionMap.set(token, {
      useId,
      token,
    });

    return token;
  }

  hasSession(key) {
    return this.sessionMap.has(key);
  }

  getSession(key) {
    return this.sessionMap.get(key);
  }

  removeSession(key) {
    return this.sessionMap.delete(key);
  }
}

module.exports = SessionController;
