/*
 * @Description: 会话控制层
 * @Author: 吴锦辉
 * @Date: 2021-09-14 09:35:58
 * @LastEditTime: 2021-09-28 16:51:22
 */

const sessionModel = require('../model/session');

class SessionController {
  constructor(mainCtrl) {
    this._mainCtrl = mainCtrl;
    this.sessionMap = new Map();
    this.userMap = new Map();
  }

  generateSession(useId) {
    const token = useId + Date.now();

    return token;
  }

  setMap(token, userId) {
    this.sessionMap.set(token, userId);

    this.userMap.set(userId, token);
  }

  createSession(data = {}) {
    return new Promise((resolve, reject) => {
      sessionModel
        .createSession(data)
        .then(res => {
          this.setMap(data.token, data.userId);

          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  hasSession(token) {
    return new Promise((resolve, reject) => {
      const flag = this.sessionMap.has(token);
      if (flag) {
        resolve(true);
        return;
      }

      sessionModel
        .selectSession({ token })
        .then(res => {
          res = JSON.parse(JSON.stringify(res));

          if (res.length === 0) {
            resolve(false);
            return;
          }

          // eslint-disable-next-line prefer-destructuring
          res = res[0];

          this.setMap(token, res.userId);

          resolve(true);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getSession(token) {
    return this.sessionMap.get(token);
  }

  removeByUserId(userId) {
    this.sessionMap.delete(this.userMap.get(userId));
    this.userMap.delete(userId);
  }

  deleteByToken(token) {
    this.userMap.delete(this.sessionMap.get(token));

    this.sessionMap.delete(token);
  }

  removeSession(token) {
    return new Promise((resolve, reject) => {
      sessionModel
        .deleteSession({ token })
        .then(res => {
          this.deleteByToken(token);

          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  deleteByUserId(userId) {
    this.sessionMap.delete(this.userMap.get(userId));

    this.userMap.delete(userId);
  }

  removeSessionByUseId(userId) {
    return new Promise((resolve, reject) => {
      sessionModel
        .deleteSession({ userId })
        .then(res => {
          this.deleteByUserId(userId);

          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = SessionController;
