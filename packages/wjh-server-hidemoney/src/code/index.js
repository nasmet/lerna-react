/*
 * @Description: code关系映射
 * @Author: 吴锦辉
 * @Date: 2021-09-14 10:02:03
 * @LastEditTime: 2021-10-01 16:09:58
 */

const codeMap = {
  Success: 0,

  /** 客户端错误 */
  InvalidToken: 4000,
  AccountNotExist: 4001,
  PasswordError: 4002,
  AccountExist: 4003,
  NotExist: 4004,
  NotSupported: 4005,
  WrongAppid: 4006,
  RoomNotExist: 4007,
  NotFound: 4008,
  MoneyCollected: 4009,
  NoWithdrawal: 4010,

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
  [codeMap.NotExist]: '未查询到',
  [codeMap.NotSupported]: '暂不支持',
  [codeMap.WrongAppid]: '错误的appid',
  [codeMap.RoomNotExist]: '房间不存在',
  [codeMap.NotFound]: '很遗憾，没找到',
  [codeMap.MoneyCollected]: '很遗憾，钱已经被领取了',
  [codeMap.NoWithdrawal]: '无可提现金额',
};

module.exports = {
  codeMap,
  codeNameMap,
};
