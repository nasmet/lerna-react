/*
 * @Description: 国际化
 * @Author: 吴锦辉
 * @Date: 2021-09-22 15:09:26
 * @LastEditTime: 2021-09-22 15:13:19
 */

export function setLanguage(payload = {}) {
  return {
    type: 'set',
    payload,
  };
}
