#! /usr/bin/env node
/*
 * @Description: 生成react项目模板
 * @Author: 吴锦辉
 * @Date: 2021-08-13 10:41:36
 * @LastEditTime: 2021-08-16 09:44:01
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const inquirer = require('inquirer');

const destPath = process.cwd();

function getTemplateList() {
  const templatePath = path.resolve(__dirname, '../template');

  return fs.readdirSync(templatePath).filter(v => !/^\..+/.test(v));
}

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

function createProjectByTemplate() {
  const templates = getTemplateList();

  inquirer
    .prompt({
      name: 'template',
      message: '请选择项目',
      type: 'list',
      choices: templates,
    })
    .then(res => {
      const templateName = res.template;
      const sourceTemplatePath = path.resolve(__dirname, `../template/${templateName}`);
      const destTemplatePath = path.resolve(destPath, templateName);

      console.log('项目创建中');
      displayPath(sourceTemplatePath);
      setTimeout(() => {
        exec(`cd ${destTemplatePath} && git init`, error => {
          if (error) {
            console.error(error);

            return;
          }

          console.log('项目创建完成');
        });
      }, 2000);
    });
}

createProjectByTemplate();
