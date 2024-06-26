/*
 * @Description: 用户属性数据库查询
 * @Author: 吴锦辉
 * @Date: 2021-09-14 11:47:48
 * @LastEditTime: 2021-09-17 16:28:07
 */

const { query } = require('../mysql/index');

class UserModel {
  spliceWhereParam(data) {
    const keys = Object.keys(data);

    let str = keys.reduce((total, key, index) => {
      if (index === 0) {
        // eslint-disable-next-line no-return-assign
        return (total += `${key}='${data[key]}'`);
      }

      // eslint-disable-next-line no-return-assign
      return (total += ` and ${key}='${data[key]}'`);
    }, '');

    if (str) {
      str = `where ${str}`;
    }

    return str;
  }

  createUser(data = {}) {
    return new Promise((resolve, reject) => {
      query({ sql: 'INSERT INTO user SET ?', data })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
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
    const { page, pageSize } = data || {};

    const from = (page - 1) * pageSize;
    const to = page * pageSize;

    return new Promise((resolve, reject) => {
      query({ sql: `select * from user limit ${from},${to}` })
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
      query({ sql: 'SELECT COUNT(*) FROM user' })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  deleteUser(data = {}) {
    const str = this.spliceWhereParam(data);

    const sql = `delete from user ${str}`;

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
