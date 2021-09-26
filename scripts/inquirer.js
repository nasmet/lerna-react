/*
 * @Description: 用户与命令行交互的工具学习
 * @Author: 吴锦辉
 * @Date: 2021-07-20 14:27:20
 * @LastEditTime: 2021-09-26 11:42:43
 */

const inquirer = require('inquirer');
const shelljs = require('shelljs');
const { getAllPackageJsonInfo } = require('./package-operator');

function init() {
  getAllPackageJsonInfo().then(res => {
    const packageInfos = res.filter(v => !!v.scripts);

    const projects = packageInfos.map((v, index) => ({
      name: v.name,
      value: index,
    }));

    inquirer
      .prompt({
        name: 'project',
        message: '请选择项目',
        type: 'list',
        choices: projects,
      })
      .then(res => {
        const { name: packageName, scripts } = packageInfos[res.project];

        const commands = Object.keys(scripts).map(v => ({
          name: v,
          value: v,
        }));

        inquirer
          .prompt({
            name: 'command',
            message: '请选择执行的命令',
            type: 'list',
            choices: commands,
          })
          .then(res => {
            shelljs.exec(`cd ./packages/${packageName} &&  npm run ${res.command}`);
          });
      });
  });
}

init();
