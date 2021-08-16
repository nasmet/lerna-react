/*
 * @Description: 上传腾讯云对象存储
 * @Author: 吴锦辉
 * @Date: 1985-10-26 16:15:00
 * @LastEditTime: 2021-08-16 11:28:51
 */

const path = require('path');
const fs = require('fs');
const COS = require('cos-nodejs-sdk-v5');
const infoOperator = require('./info-operator');

let config;
let cos;

const root = process.cwd();
const regex = /(.+\\)/g;
let prePath = regex.exec(root);
if (prePath) {
  // eslint-disable-next-line prefer-destructuring
  prePath = prePath[0];
} else {
  prePath = root;
}

function upload(root) {
  fs.stat(root, (err, stat) => {
    if (err) {
      console.error(err);
    } else if (stat.isFile()) {
      const file = root.replace(/\\/g, '/');
      const filename = root.replace(prePath, '').replace(/\\/g, '/');
      cos.putObject(
        {
          Bucket: config.Bucket,
          Region: config.Region,
          Key: `${filename}`,
          Body: fs.createReadStream(file),
        },
        err => {
          if (err) {
            console.error(err);
          } else {
            console.log(`${root}上传到对象存储了`);
          }
        }
      );
    } else if (stat.isDirectory()) {
      fs.readdir(root, (err, files) => {
        if (err) {
          console.error(err);
        } else {
          files.forEach(file => {
            upload(path.join(root, file));
          });
        }
      });
    }
  });
}

module.exports = () => {
  infoOperator.read().then(res => {
    config = res;
    cos = new COS({
      SecretId: config.SecretId,
      SecretKey: config.SecretKey,
    });
    upload(root);
  });
};
