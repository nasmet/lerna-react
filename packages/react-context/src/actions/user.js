/*
 * @Description: 用户actions
 * @Author: 吴锦辉
 * @Date: 2021-08-09 09:41:46
 * @LastEditTime: 2021-08-09 09:44:14
 */

export function updateUser(payload) {
  return {
    type: 'updateUser',
    payload,
  };
}
