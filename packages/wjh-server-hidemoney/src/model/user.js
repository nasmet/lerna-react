/*
 * @Description: 用户属性数据库查询
 * @Author: 吴锦辉
 * @Date: 2021-09-14 11:47:48
 * @LastEditTime: 2021-10-08 10:15:24
 */

const { query } = require('../mysql/index');
const { appid } = require('../config');

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

  updateUser(data = {}) {
    const { id, ...other } = data || {};

    const sql = `update user SET ? where id='${id}'`;

    return new Promise((resolve, reject) => {
      query({ sql, data: other })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  selectUserByPage(data = {}) {
    // eslint-disable-next-line prefer-const
    let { page, pageSize, sort } = data || {};

    const from = (page - 1) * pageSize;
    const to = page * pageSize;

    if (sort) {
      sort = `order by ${sort}`;
    } else {
      sort = '';
    }

    const str = this.spliceWhereParam({ appid });

    const sql = `select * from user ${str} ${sort} limit ${from},${to}`;

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
