/*
 * @Description: reducers相关方法
 * @Author: 吴锦辉
 * @Date: 2021-07-30 10:56:24
 * @LastEditTime: 2021-07-30 11:05:11
 */

export function countReducer(state, action) {
  switch (action.type) {
    case 'add':
      const count = state.count + action.payload.count || 0;

      return { ...state, count };
    case 'reduce':
      const count1 = state.count - action.payload.count || 0;

      return { ...state, count: count1 };
    default:
      return state;
  }
}
