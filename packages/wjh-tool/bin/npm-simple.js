#! /usr/bin/env node

/*
 * @Description: 简化npm命令
 * @Author: 吴锦辉
 * @Date: 2021-04-25 17:14:25
 * @LastEditTime: 2021-08-05 11:44:33
 * reference: https://www.runoob.com/nodejs/nodejs-npm.html
 */

const { exec, which, echo } = require('shelljs');
const { argv } = require('yargs');

if (!which('npm')) {
  echo('npm未安装');

  return;
}

if (argv.usd) {
  usd(argv.usd);

  return;
}

if (argv.us) {
  us(argv.us);

  return;
}

if (argv.isd) {
  isd(argv.isd);

  return;
}

if (argv.is) {
  is(argv.is);

  return;
}

if (argv.vp) {
  vp(argv.vp);

  return;
}

if (argv.lp) {
  lp(argv.lp);

  return;
}

if (argv.vgp) {
  vgp();

  return;
}

exec('npm --version');

/**
 * @description: 卸载开发依赖包
 * @param {string} package
 * @return {void}
 */
function usd(package) {
  exec(`npm uninstall ${package} --save-dev`);
}

/**
 * @description: 卸载依赖包
 * @param {string} package
 * @return {void}
 */
function us(package) {
  exec(`npm uninstall ${package} --save`);
}

/**
 * @description: 安装开发依赖包
 * @param {string} package
 * @return {void}
 */
function isd(package) {
  exec(`npm install ${package} --save-dev`);
}

/**
 * @description: 安装依赖包
 * @param {string} package
 * @return {void}
 */
function is(package) {
  exec(`npm install ${package} --save`);
}

/**
 * @description: 查看依赖包最新版本
 * @param {string} package
 * @return {void}
 */
function vp(package) {
  exec(`npm view ${package} version`);
}

/**
 * @description: 本地依赖包版本
 * @param {string} package
 * @return {void}
 */
function lp(package) {
  exec(`npm ls ${package}`);
}

/**
 * @description: 查看全局依赖包
 * @return {void}
 */
function vgp() {
  exec('npm list -g --depth 0');
}
