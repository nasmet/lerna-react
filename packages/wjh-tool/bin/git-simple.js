#! /usr/bin/env node

/*
 * @Description: 简化git命令
 * @Author: 吴锦辉
 * @Date: 2021-04-25 15:35:56
 * @LastEditTime: 2021-09-03 11:01:25
 * reference: https://www.runoob.com/git/git-tutorial.html
 */

const { exec, which, echo } = require('shelljs');
const { argv } = require('yargs');

if (!which('git')) {
  echo('git未安装');

  return;
}

if (argv.vr) {
  vr();

  return;
}

if (argv.ar) {
  ar(argv.ar);

  return;
}

if (argv.rr) {
  rr();

  return;
}

if (argv.ur) {
  ur(argv.ur);

  return;
}

if (argv.ac) {
  ac(argv.ac);

  return;
}

if (argv.pull) {
  pull(argv.pull);

  return;
}

if (argv.push) {
  push(argv.push);

  return;
}

if (argv.stas) {
  stas(argv.stas);

  return;
}

if (argv.pop) {
  pop(argv.pop);

  return;
}

if (argv.vb) {
  vb();

  return;
}

if (argv.ab) {
  ab();

  return;
}

if (argv.sb) {
  sb(argv.sb);

  return;
}

if (argv.chec) {
  chec(argv.chec);

  return;
}

if (argv.db) {
  db(argv.db);

  return;
}

if (argv.sn) {
  sn(argv.sn);

  return;
}

if (argv.se) {
  se(argv.se);

  return;
}

if (argv.vc) {
  vc(argv.vc);

  return;
}

if (argv.ss) {
  ss(argv.ss);

  return;
}

if (argv.sf) {
  sf(argv.sf);

  return;
}

exec('git --version');

/**
 * @description: 查看远程仓库
 * @param {void}
 * @return {void}
 */
function vr() {
  exec('git remote -v');
}

/**
 * @description: 连接远程仓库
 * @param {string} url
 * @return {void}
 */
function ar(url) {
  exec(`git remote add origin ${url}`);
}

/**
 * @description: 移除远程仓库
 * @param {void}
 * @return {void}
 */
function rr() {
  exec('git remote remove origin');
}

/**
 * @description: 更新远程仓库
 * @param {string} url
 * @return {void}
 */
function ur(url) {
  exec(`git remote remove origin && git remote add origin ${url}`);
}

/**
 * @description: 添加并提交
 * @param {string} remark 提交备注
 * @return {void}
 */
function ac(remark) {
  exec(`git add -A && git commit -m '${remark}'`);
}

/**
 * @description: 拉取远程分支
 * @param {string} 分支
 * @return {void}
 */
function pull(branch) {
  exec(`git pull origin ${branch}`);
}

/**
 * @description: 上传远程分支
 * @param {string} 分支
 * @return {void}
 */
function push(branch) {
  exec(`git push origin ${branch}`);
}

/**
 * @description: 保留当前工作区间
 * @param {string} remark 备注
 * @return {void}
 */
function stas(remark) {
  exec(`git stash save ${remark}`);
}

/**
 * @description: 弹出最后一次保留当前工作区间
 * @return {void}
 */
function pop() {
  exec('git stash pop');
}

/**
 * @description: 查看分支
 * @return {void}
 */
function vb() {
  exec('git branch');
}

/**
 * @description: 创建分支
 * @param {string} 分支
 * @return {void}
 */
function ab(branch) {
  exec(`git branch ${branch}`);
}

/**
 * @description: 切换分支
 * @param {string} 分支
 * @return {void}
 */
function sb(branch) {
  exec(`git switch ${branch}`);
}

/**
 * @description: 创建并切换分支
 * @param {string} 分支
 * @return {void}
 */
function chec(branch) {
  exec(`git checkout -b ${branch}`);
}

/**
 * @description: 删除分支
 * @param {string} 分支
 * @return {void}
 */
function db(branch) {
  exec(`git branch -D ${branch}`);
}

/**
 * @description: 设置名字
 * @param {string} name
 * @return {void}
 */
function sn(name) {
  exec(`git config --global user.name ${name}`);
}

/**
 * @description: 设置邮箱
 * @param {string} email
 * @return {void}
 */
function se(email) {
  exec(`git config --global user.email ${email}`);
}

/**
 * @description: 查看配置
 * @return {void}
 */
function vc() {
  exec('git config --global --list');
}

/**
 * @description: 查询某个字符串的变动历史提交
 * @param {string} chars
 * @return {void}
 */
function ss(chars) {
  exec(`git log -S ${chars}`);
}

/**
 * @description: 查询指定文件的变动历史提交
 * @param {string} path
 * @return {void}
 */
function sf(path) {
  exec(`git log -- ${path}`);
}
