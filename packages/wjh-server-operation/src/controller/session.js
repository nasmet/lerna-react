/*
 * @Description: 会话控制层
 * @Author: 吴锦辉
 * @Date: 2021-09-14 09:35:58
 * @LastEditTime: 2021-09-25 17:06:26
 */

const sessionModel = require('../model/session');

class SessionController {
  constructor(mainCtrl) {
    this._mainCtrl = mainCtrl;
  }

  hasSession(token) {
    return new Promise((resolve, reject) => {
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

          resolve(res.userId);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = SessionController;
