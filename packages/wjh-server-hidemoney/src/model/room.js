/*
 * @Description: 房间属性数据库查询
 * @Author: 吴锦辉
 * @Date: 2021-09-28 15:54:39
 * @LastEditTime: 2021-10-08 10:15:57
 */

const { query } = require('../mysql/index');

class RoomModel {
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

  createRoom(data = {}) {
    return new Promise((resolve, reject) => {
      query({ sql: 'INSERT INTO room SET ?', data })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  selectRoom(data = {}) {
    const str = this.spliceWhereParam(data);

    const sql = `select * from room ${str}`;

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

  updateRoom(data = {}) {
    const { id, ...other } = data || {};

    const sql = `update room SET ? where id='${id}'`;

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
}

module.exports = new RoomModel();
