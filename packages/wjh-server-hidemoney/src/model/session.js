/*
 * @Description: 应用模块
 * @Author: 吴锦辉
 * @Date: 2021-09-25 15:07:36
 * @LastEditTime: 2021-09-26 13:49:05
 */

const { query } = require('../mysql/index');

class SessionModel {
  spliceWhereParam(data, like = false) {
    const keys = Object.keys(data);

    let str = keys.reduce((total, key, index) => {
      if (index === 0) {
        // eslint-disable-next-line no-return-assign
        return (total += `${key}${like ? ' like ' : '='}'${like ? `%${data[key]}%` : data[key]}'`);
      }

      // eslint-disable-next-line no-return-assign
      return (total += ` and ${key}${like ? ' like ' : '='}'${
        like ? `%${data[key]}%` : data[key]
      }'`);
    }, '');

    if (str) {
      str = `where ${str}`;
    }

    return str;
  }

  createSession(data = {}) {
    return new Promise((resolve, reject) => {
      query({ sql: 'INSERT INTO session_hidemoney SET ?', data })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  selectSession(data = {}) {
    const str = this.spliceWhereParam(data);

    const sql = `select * from session_hidemoney ${str}`;

    console.log('sql: ', sql);

    return new Promise((resolve, reject) => {
      query({ sql })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  deleteSession(data = {}) {
    const str = this.spliceWhereParam(data);

    const sql = `delete from session_hidemoney ${str}`;

    console.log('sql: ', sql);

    return new Promise((resolve, reject) => {
      query({ sql })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = new SessionModel();
