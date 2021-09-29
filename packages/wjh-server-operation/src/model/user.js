/*
 * @Description: 用户属性数据库查询
 * @Author: 吴锦辉
 * @Date: 2021-09-14 11:47:48
 * @LastEditTime: 2021-09-29 16:39:05
 */

const { query } = require('../mysql/index');

class UserModel {
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

  selectUser(data = {}) {
    const str = this.spliceWhereParam(data);

    const sql = `select * from user ${str}`;

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

  selectUserByPage(data = {}) {
    const { page, pageSize, ...other } = data || {};

    const from = (page - 1) * pageSize;
    const to = page * pageSize;

    const str = this.spliceWhereParam(other || {}, true);

    const sql = `select * from user ${str} limit ${from},${to}`;

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

  selectUserCount(data = {}) {
    const str = this.spliceWhereParam(data);

    const sql = `SELECT COUNT(*) FROM user ${str}`;

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

module.exports = new UserModel();
