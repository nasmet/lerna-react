/*
 * @Description: actions相关指令
 * @Author: 吴锦辉
 * @Date: 2021-07-29 17:19:00
 * @LastEditTime: 2021-07-29 17:31:31
 */

export function addCount(value) {
  return {
    type: 'add',
    payload: {
      count: value,
    },
  };
}

export function reduceCount(value) {
  return {
    type: 'reduce',
    payload: {
      count: value,
    },
  };
}
