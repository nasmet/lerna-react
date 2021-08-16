/*
 * @Description: 用户与命令行交互的工具学习
 * @Author: 吴锦辉
 * @Date: 2021-07-16 14:11:13
 * @LastEditTime: 2021-07-21 16:03:26
 */

const inquirer = require('inquirer');
const shelljs = require('shelljs');

const projects = [
  {
    name: '永旺小程序',
    value: '永旺小程序',
  },
  {
    name: 'H5',
    value: 'H5',
  },
  {
    name: '业务中台',
    value: '业务中台',
  },
];

const envs = [
  {
    name: '开发环境',
    value: 'dev',
  },
  {
    name: '测试环境',
    value: 'test',
  },
  {
    name: '预发环境',
    value: 'uat',
  },
  {
    name: '生产环境',
    value: 'prod',
  },
];

inquirer
  .prompt({
    name: 'project',
    message: '请选择项目',
    type: 'list',
    choices: projects,
  })
  .then((res1) => {
    inquirer
      .prompt({
        name: 'env',
        message: '请选择环境',
        type: 'list',
        choices: envs,
      })
      .then((res2) => {
        /** 根据不同项目名和环境执行相应的shell命令 */
        shelljs.echo(`运行${res1.project}的${res2.env}环境`);
        // shelljs.exec();
      });
  });
