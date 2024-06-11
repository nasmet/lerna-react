/*
 * @Description: mysql配置
 * @Author: 吴锦辉
 * @Date: 2021-09-14 11:33:02
 * @LastEditTime: 2021-10-08 14:14:37
 */

const mysql = require('mysql');

const baseConfig = {
  connectionLimit: 10,
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: '',
  port: 3306,
};

if (process.env.NODE_ENV === 'development') {
  baseConfig.password = '824966wjh';
}

const pool = mysql.createPool(baseConfig);

function query({ sql, data = {} }) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);

        return;
      }

      connection.query(sql, data, (err, result) => {
        connection.release();

        if (err) {
          reject(err);

          return;
        }

        resolve(result);
      });
    });
  });
}

module.exports = {
  query,
};
