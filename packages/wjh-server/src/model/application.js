/*
 * @Description: 应用模块
 * @Author: 吴锦辉
 * @Date: 2021-09-24 22:20:25
 * @LastEditTime: 2021-09-25 14:19:24
 */

const { query } = require('../mysql/index');

class ApplicationModel {
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

  createApplication(data = {}) {
    return new Promise((resolve, reject) => {
      query({ sql: 'INSERT INTO application SET ?', data })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  updateApplication(data = {}) {
    return new Promise((resolve, reject) => {
      const { id, ...other } = data;

      query({ sql: `update application SET ? where id='${id}'`, data: other || {} })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  selectApplication(data = {}) {
    const str = this.spliceWhereParam(data);

    const sql = `select * from application ${str}`;

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

  selectApplicationByPage(data = {}) {
    const { page, pageSize, ...other } = data || {};

    const from = (page - 1) * pageSize;
    const to = page * pageSize;

    const str = this.spliceWhereParam(other || {}, true);

    const sql = `select * from application ${str} limit ${from},${to}`;

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

  selectApplicationCount() {
    return new Promise((resolve, reject) => {
      query({ sql: 'SELECT COUNT(*) FROM application' })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = new ApplicationModel();
