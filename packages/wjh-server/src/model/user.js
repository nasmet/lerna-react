/*
 * @Description: 用户属性数据库查询
 * @Author: 吴锦辉
 * @Date: 2021-09-14 11:47:48
 * @LastEditTime: 2021-09-14 18:01:31
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

module.exports = {
  createUser,
  selectUser,
  selectAccount,
};
