/*
 * @Description: 会话控制层
 * @Author: 吴锦辉
 * @Date: 2021-09-14 09:35:58
 * @LastEditTime: 2021-09-14 10:21:49
 */

class SessionController {
  constructor() {
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

const sessionController = new SessionController();

module.exports = sessionController;
