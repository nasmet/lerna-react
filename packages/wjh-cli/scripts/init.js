#! /usr/bin/env node
/*
 * @Description: 生成react项目模板
 * @Author: 吴锦辉
 * @Date: 2021-08-13 10:41:36
 * @LastEditTime: 2021-08-13 13:03:42
 */

const fs = require('fs');
const path = require('path');

const sourcePath = process.cwd();

const templatePath = path.resolve(__dirname, '../template/react-project');

console.log(sourcePath, templatePath);

function displayPath(filePath) {
  fs.stat(filePath, (err, stat) => {
    if (err) {
      console.error(err);
    } else if (stat.isFile()) {
      fs.copyFileSync(filePath, filePath.replace(__dirname, sourcePath));
    } else if (stat.isDirectory()) {
      fs.mkdirSync(filePath.replace(path.resolve(__dirname, 'template'), sourcePath));

      fs.readdir(filePath, (err, files) => {
        if (err) {
          console.error(err);
        } else {
          files.forEach(file => {
            displayPath(path.resolve(filePath, file));
          });
        }
      });
    }
  });
}

console.log('项目创建中');

displayPath(templatePath);

console.log('项目创建完成');

console.log('执行模块安装');

console.log('模块安装完成');
