#! /usr/bin/env node
/*
 * @Description: 生成react项目模板
 * @Author: 吴锦辉
 * @Date: 2021-08-13 10:41:36
 * @LastEditTime: 2021-08-13 14:01:47
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const destPath = process.cwd();

const templatePath = path.resolve(__dirname, '../template/react-project');

function displayPath(filePath) {
  fs.stat(filePath, (err, stat) => {
    if (err) {
      console.error(err);
    } else if (stat.isFile()) {
      const source = filePath;
      const dest = source.replace(path.resolve(__dirname, '../template'), destPath);

      fs.copyFile(source, dest, err => {
        if (err) {
          console.error(err);
        }
      });
    } else if (stat.isDirectory()) {
      const source = filePath;
      const dest = source.replace(path.resolve(__dirname, '../template'), destPath);

      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest);
      }

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

const projectPath = path.resolve(destPath, 'react-project');

setTimeout(() => {
  exec(`cd ${projectPath} && git init`, error => {
    if (error) {
      console.error(error);

      return;
    }

    console.log('项目创建完成');
  });
}, 2000);
