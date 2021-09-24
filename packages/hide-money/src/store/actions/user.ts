/*
 * @Description: 用户信息
 * @Author: 吴锦辉
 * @Date: 2021-09-24 09:27:08
 * @LastEditTime: 2021-09-24 09:28:51
 */

function setUserInfo(payload = {}) {
  return {
    type: 'set',
    payload,
  };
}

export { setUserInfo };
