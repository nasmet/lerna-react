/*
 * @Description: 包操作相关
 * @Author: 吴锦辉
 * @Date: 2021-08-04 10:45:36
 * @LastEditTime: 2021-08-11 13:36:13
 */

const fs = require('fs');
const path = require('path');

const packagesPath = path.join(__dirname, '../packages');

function getAllPackageJsonPath(filePath = packagesPath) {
  let fileList = fs.readdirSync(filePath);

  fileList = fileList.map(v => path.join(filePath, `./${v}/package.json`));

  return fileList;
}

function getPackageJsonInfo(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        console.error('读取文件失败: ', err);
        reject();

        return;
      }

      const values = JSON.parse(data.toString() || 'false');

      if (!values) {
        console.warn('文件为空');
        reject();

        return;
      }

      resolve({
        name: values.name,
        scripts: values.scripts,
      });
    });
  });
}

function getAllPackageJsonInfo() {
  return new Promise((resolve, reject) => {
    const list = getAllPackageJsonPath().map(v => getPackageJsonInfo(v));

    Promise.all(list)
      .then(res => {
        resolve(res);
      })
      .catch(() => {
        reject();
      });
  });
}

module.exports = {
  getAllPackageJsonInfo,
};
