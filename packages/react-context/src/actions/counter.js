/*
 * @Description: 计数器actions
 * @Author: 吴锦辉
 * @Date: 2021-07-29 17:19:00
 * @LastEditTime: 2021-08-09 09:43:13
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

/** 异步action范例 */
export function asyncReduceAction(dispatch) {
  return function (value) {
    setTimeout(() => {
      dispatch({
        type: 'reduce',
        payload: {
          count: value,
        },
      });
    }, 1000);
  };
}
