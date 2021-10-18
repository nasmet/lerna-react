#! /usr/bin/env node
/*
 * @Description: 生成react项目模板
 * @Author: 吴锦辉
 * @Date: 2021-08-13 10:41:36
 * @LastEditTime: 2021-10-18 11:38:17
 */

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const destPath = process.cwd();

function getTemplateList() {
  const templatePath = path.resolve(__dirname, '../template');

  return fs.readdirSync(templatePath).filter(v => !/^\..+/.test(v));
}

/**
 * @description: 递归复制项目模版
 * @param {string} filePath 项目模版根路径
 * @return {void}
 */
function copyTemplate(filePath) {
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
            copyTemplate(path.resolve(filePath, file));
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
      message: '请选择模版',
      type: 'list',
      choices: templates,
    })
    .then(res => {
      const templateName = res.template;
      const sourceTemplatePath = path.resolve(__dirname, `../template/${templateName}`);

      console.log('项目创建中');

      copyTemplate(sourceTemplatePath);
    });
}

createProjectByTemplate();
