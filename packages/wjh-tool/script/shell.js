#!/usr/bin/env node

/*
 * @Description: shell命令学习
 * @Author: 吴锦辉
 * @Date: 2021-04-25 15:01:52
 * @LastEditTime: 2021-04-28 16:48:55
 * reference: https://www.runoob.com/linux/linux-command-manual.html
 */

const { echo, which, cat, chmod, find, ln, rm } = require('shelljs');

/** 输出 */
echo('hello world');

/** 查找文件位置 */
const path = which('node');

if (path) {
  echo('node的安装路径: ', path);
} else {
  echo('node未安装');
}

/** 查看文件 */
const word = cat('-n', './img-compress.js');

if (word) {
  echo(word);
} else {
  echo('文件不存在');
}

/** 控制用户对文件权限控制 */
chmod('755', './img-compress.js');

/** 指定目录下查找文件 */
const paths = find('-name *.js', '.');

if (paths) {
  echo('paths: ', paths);
} else {
  echo('查找文件失败');
}

/** 链接 */
ln('-s', 'shell.js', 'shell');

/** 删除 */
rm('-r', 'shell');
