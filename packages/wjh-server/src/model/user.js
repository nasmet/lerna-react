/*
 * @Description: 用户属性数据库查询
 * @Author: 吴锦辉
 * @Date: 2021-09-14 11:47:48
 * @LastEditTime: 2021-09-17 11:22:44
 */

const { query } = require('../mysql/index');

function createUser(data = {}) {
  return new Promise((resolve, reject) => {
    console.log('insert: ', data);
    query({ sql: 'INSERT INTO user SET ?', data })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function selectUser(data = {}) {
  const { account, password } = data || {};

  return new Promise((resolve, reject) => {
    query({ sql: `SELECT * FROM user WHERE account='${account}' AND password='${password}'` })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function selectAccount(data = {}) {
  const { account } = data || {};

  return new Promise((resolve, reject) => {
    query({ sql: `SELECT * FROM user WHERE account='${account}'` })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

function selectUserByPage(data = {}) {
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

function selectUserCount() {
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

module.exports = {
  createUser,
  selectUser,
  selectAccount,
  selectUserByPage,
  selectUserCount,
};
