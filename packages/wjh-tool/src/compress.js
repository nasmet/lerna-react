/*
 * @Description: 图片压缩
 * @Author: 吴锦辉
 * @Date: 1985-10-26 16:15:00
 * @LastEditTime: 2021-08-16 11:26:32
 */

const path = require('path');
const fs = require('fs');
const tinify = require('tinify');
const infoOperator = require('./info-operator');
const config = require('../config');

const root = process.cwd();

function compressImage(root) {
  fs.stat(root, (err, stat) => {
    if (err) {
      console.error(err);
    } else if (stat.isFile() && config.ImageRegex.test(root)) {
      console.log(`${root}压缩中`);

      const source = tinify.fromFile(root);

      source
        .toFile(root)
        .then(() => {
          console.log(`${root}被压缩了`);
        })
        .catch(e => {
          console.error(e);
        });
    } else if (stat.isDirectory()) {
      if (config.IgnoreRegex.test(root)) {
        return;
      }

      fs.readdir(root, (err, files) => {
        if (err) {
          console.error(err);
        } else {
          files.forEach(file => {
            compressImage(path.join(root, file));
          });
        }
      });
    }
  });
}

module.exports = () => {
  infoOperator.read().then(res => {
    tinify.key = res.TinifyKey;
  });
  compressImage(root);
};
