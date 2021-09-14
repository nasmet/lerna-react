/*
 * @Description: session错误code
 * @Author: 吴锦辉
 * @Date: 2021-09-14 10:02:03
 * @LastEditTime: 2021-09-14 17:11:46
 */

const codeMap = {
  Success: 0,
  Unknown: 5001,
  InvalidToken: 5002,
  AccountNotExist: 5003,
  PasswordError: 5004,
  AccountExist: 5005,
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
