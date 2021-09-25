/*
 * @Description: 用户模块的参数验证
 * @Author: 吴锦辉
 * @Date: 2021-09-24 22:17:06
 * @LastEditTime: 2021-09-25 14:25:11
 */

const { verifyParamsHandle } = require('../middleware/index');

// interface Iparams{
//   required: boolen,
//   type: 1 | 2 | 3 | 4,
//   max: number,
//   min: number,
//   regex: regex
// }
// 1: '[object Object]',
// 2: '[object Number]',
// 3: '[object String]',
// 4: '[object Array]',

function verifyApplicationListParams() {
  const verifyRules = {
    page: {
      required: true,
      type: 2,
      regex: /^\d+$/,
    },
    pageSize: {
      required: true,
      type: 2,
      regex: /^\d+$/,
    },
    appid: {
      required: false,
      type: 3,
      max: 30,
    },
    name: {
      required: false,
      type: 3,
      max: 30,
    },
  };

  return verifyParamsHandle(verifyRules);
}

function verifyApplicationCreateParams() {
  const verifyRules = {
    appid: {
      required: true,
      type: 3,
      max: 30,
    },
    name: {
      required: true,
      type: 3,
      max: 30,
    },
    developer: {
      required: false,
      type: 3,
      max: 30,
    },
    company: {
      required: false,
      type: 3,
      max: 30,
    },
    desc: {
      required: false,
      type: 3,
      max: 50,
    },
  };

  return verifyParamsHandle(verifyRules);
}

function verifyApplicationDetailsParams() {
  const verifyRules = {
    id: {
      required: true,
      type: 3,
      max: 30,
    },
  };

  return verifyParamsHandle(verifyRules);
}

function verifyApplicationUpdateParams() {
  const verifyRules = {
    id: {
      required: true,
      type: 3,
      max: 30,
    },
    name: {
      required: false,
      type: 3,
      max: 30,
    },
    developer: {
      required: false,
      type: 3,
      max: 30,
    },
    company: {
      required: false,
      type: 3,
      max: 30,
    },
    desc: {
      required: false,
      type: 3,
      max: 50,
    },
  };

  return verifyParamsHandle(verifyRules);
}

module.exports = {
  verifyApplicationListParams,
  verifyApplicationCreateParams,
  verifyApplicationDetailsParams,
  verifyApplicationUpdateParams,
};
