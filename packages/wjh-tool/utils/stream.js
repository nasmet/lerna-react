/*
 * @Description: 文件流
 * @Author: 吴锦辉
 * @Date: 2021-05-08 14:31:54
 * @LastEditTime: 2021-07-15 16:42:12
 */

const fs = require('fs');

/**
 * @description: 流读取文件
 * @param {string} file
 * @return {void}
 */
function streamReadFile(file) {
  return new Promise((reslove, reject) => {
    const rs = fs.createReadStream(file);

    let buf = Buffer.alloc(0);

    rs.on('data', (chunk) => {
      buf = Buffer.concat([buf, chunk], buf.length + chunk.length);
    });

    rs.on('end', () => {
      const str = buf.toString('utf-8');

      reslove(str);

      rs.close();
    });

    rs.on('err', (err) => {
      console.error(err);

      reject();
    });
  });
}

/**
 * @description: 流写入文件
 * @param {string} file
 * @return {void}
 */
function streamWriteFile(file, data) {
  return new Promise((reslove, reject) => {
    const ws = fs.createWriteStream(file);

    ws.write(data, (err) => {
      if (err) {
        console.error(err);

        reject();

        return;
      }

      reslove();
    });
  });
}

module.exports = {
  streamWriteFile,
  streamReadFile,
};
