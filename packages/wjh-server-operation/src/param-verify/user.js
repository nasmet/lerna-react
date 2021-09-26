/*
 * @Description: 用户模块的参数验证
 * @Author: 吴锦辉
 * @Date: 2021-09-16 10:23:43
 * @LastEditTime: 2021-09-25 17:10:14
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

function verifyUserListParams() {
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
  };

  return verifyParamsHandle(verifyRules);
}

module.exports = {
  verifyUserListParams,
};
