#! /usr/bin/env node
/*
 * @Description: 生成react项目模板
 * @Author: 吴锦辉
 * @Date: 2021-08-13 10:41:36
 * @LastEditTime: 2021-08-13 14:19:19
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const destPath = process.cwd();
const projectName = 'react-project';
const templatePath = path.resolve(__dirname, `../template/${projectName}`);
const projectPath = path.resolve(destPath, projectName);

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

function createProject(templatePath) {
  console.log('项目创建中');
  displayPath(templatePath);
  setTimeout(() => {
    exec(`cd ${projectPath} && git init`, error => {
      if (error) {
        console.error(error);

        return;
      }

      console.log('项目创建完成');
    });
  }, 2000);
}

createProject(templatePath);
