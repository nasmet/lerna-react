/*
 * @Description: code关系映射
 * @Author: 吴锦辉
 * @Date: 2021-09-14 10:02:03
 * @LastEditTime: 2021-09-25 17:27:13
 */

const codeMap = {
  Success: 0,

  /** 客户端错误 */
  InvalidToken: 4000,
  WrongAppid: 4001,

  /** 服务端错误 */
  Unknown: 5000,
};

const codeNameMap = {
  [codeMap.Success]: '执行成功',
  [codeMap.InvalidToken]: '令牌无效',
  [codeMap.Unknown]: '未知错误',
  [codeMap.WrongAppid]: '错误的appid',
};

module.exports = {
  codeMap,
  codeNameMap,
};
