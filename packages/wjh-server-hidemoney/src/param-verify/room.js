/*
 * @Description: 房间模块的参数验证
 * @Author: 吴锦辉
 * @Date: 2021-09-28 15:44:11
 * @LastEditTime: 2021-09-28 17:13:59
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

function verifyHideMoneyParams() {
  const verifyRules = {
    sceneId: {
      required: true,
      type: 3,
    },
    itemId: {
      required: true,
      type: 3,
    },
    money: {
      required: true,
      type: 3,
      regex: /^\d{1,3}$/,
    },
  };

  return verifyParamsHandle(verifyRules);
}

function verifyFindMoneyParams() {
  const verifyRules = {
    id: {
      required: true,
      type: 3,
    },
  };

  return verifyParamsHandle(verifyRules);
}

module.exports = {
  verifyHideMoneyParams,
  verifyFindMoneyParams,
};
