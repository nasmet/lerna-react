/*
 * @Description: code关系映射
 * @Author: 吴锦辉
 * @Date: 2021-09-14 10:02:03
 * @LastEditTime: 2021-09-15 15:21:31
 */

const codeMap = {
  Success: 0,

  /** 客户端错误 */
  InvalidToken: 4000,
  AccountNotExist: 4001,
  PasswordError: 4002,
  AccountExist: 4003,

  /** 服务端错误 */
  Unknown: 5000,
};

const codeNameMap = {
  [codeMap.Success]: '执行成功',
  [codeMap.InvalidToken]: '令牌无效',
  [codeMap.Unknown]: '未知错误',
  [codeMap.AccountNotExist]: '账号不存在',
  [codeMap.PasswordError]: '密码错误',
  [codeMap.AccountExist]: '账号已注册',
};

module.exports = {
  codeMap,
  codeNameMap,
};
