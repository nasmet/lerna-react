/*
 * @Description: 文件读写方法
 * @Author: 吴锦辉
 * @Date: 1985-10-26 16:15:00
 * @LastEditTime: 2021-08-16 11:27:15
 */
const path = require('path');
const fs = require('fs');

const infoPath = path.resolve(__dirname, '../info.json');

function write(data) {
  const str = JSON.stringify(data);
  fs.writeFile(infoPath, str, err => {
    if (err) {
      console.error(err);
    }
  });
}

function read() {
  return new Promise(resolve => {
    fs.readFile(infoPath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
      const obj = JSON.parse(data);
      resolve(obj);
    });
  });
}

module.exports = {
  write,
  read,
};
