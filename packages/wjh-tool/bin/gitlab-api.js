#! /usr/bin/env node

/*
 * @Description: gitlab相关Api使用
 * @Author: 吴锦辉
 * @Date: 2021-05-08 14:14:04
 * @LastEditTime: 2021-08-16 14:01:34
 */

const { argv } = require('yargs');
const https = require('https');
const stream = require('./stream');
const { spliceUrlParams } = require('../utils/url');

const HOST = 'dev-gitlab.aeonbuy.com';
const PORT = 443;
const TOKEN = 'C-zscR5_9qWka1AhnVaa';

if (argv.auth) {
  setAuth({
    projectId: argv.pid,
    userId: argv.uid,
    level: argv.leve,
  });

  return;
}

if (argv.gp) {
  getGlP();

  return;
}

if (argv.gu) {
  getUsers(argv.gu);

  return;
}

if (argv.gm) {
  getMembersById(argv.gm);

  return;
}

function request(options = {}) {
  return new Promise((resolve, reject) => {
    options = {
      hostname: HOST,
      port: PORT,
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
      },
      ...options,
    };

    if (!options.data) {
      options.data = {};
    }

    if (TOKEN) {
      options.data.private_token = TOKEN;
    }

    options.path = spliceUrlParams(options.path, {
      private_token: TOKEN,
      ...options.data,
    });

    Reflect.deleteProperty(options, 'data');

    const req = https.request(options, res => {
      res.setEncoding('utf-8');

      let data = '';

      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          data = JSON.parse(data);

          resolve(data);
        } catch (e) {
          console.error(e);

          reject();
        }
      });
    });

    req.on('error', e => {
      console.error(e);
    });

    req.end();
  });
}

/**
 * @description: 获取项目列表
 * @param {void}
 * @return {promise}
 */
function getGlP() {
  request({
    path: '/api/v4/projects',
  }).then(res => {
    const data = res.map(v => {
      return {
        id: v.id,
        name: v.name,
        permissions: v.permissions,
      };
    });

    console.log(data);
  });
}

/**
 * @description: 通过项目id获取所属成员
 * @param {number ｜ string} id
 * @return {void}
 */
function getUsers(page = 1) {
  request({
    path: '/api/v4/users',
    data: {
      page,
    },
  }).then(res => {
    const data = res.map(v => {
      return {
        id: v.id,
        name: v.name,
        username: v.username,
      };
    });

    stream.streamWriteFile(`../static/user-${page}.json`, JSON.stringify(data));
  });
}

/**
 * @description: 通过项目id获取所属成员
 * @param {number ｜ string} id
 * @return {void}
 */
function getMembersById(id) {
  request({
    path: `/api/v4/projects/${id}/members`,
  }).then(res => {
    const data = res.map(v => {
      return {
        id: v.id,
        name: v.name,
        username: v.username,
        access_level: v.access_level,
      };
    });

    console.log(data);
  });
}

/**
 * @description: 设置项目权限
 * @param {string | number} projectId
 * @param {string | number} userId
 * @param {string | number} level 权限等级
 * @return {void}
 */
function setAuth({ projectId, userId, level }) {
  request({
    path: `/api/v4/projects/${projectId}/members/${userId}`,
    method: 'PUT',
    data: {
      access_level: level,
    },
  }).then(res => {
    console.log(res);
  });
}
