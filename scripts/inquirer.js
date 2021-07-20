/*
 * @Description: 用户与命令行交互的工具学习
 * @Author: 吴锦辉
 * @Date: 2021-07-20 14:27:20
 * @LastEditTime: 2021-07-20 17:32:16
 */

const inquirer = require('inquirer');
const shelljs = require('shelljs');
const fs = require('fs');
const path = require('path');
const root = process.cwd();
const devEnv = process.argv.includes('--dev');

const projects = [
  {
    name: 'react-refresh',
    value: 1,
  },
];

inquirer
  .prompt({
    name: 'project',
    message: '请选择项目',
    type: 'list',
    choices: projects,
  })
  .then((res) => {
    /** 根据不同项目名和环境执行相应的shell命令 */
    if (res.project === 1) {
      shelljs.exec('cd ./packages/react-refresh &&  npm run start');
    }
  });
