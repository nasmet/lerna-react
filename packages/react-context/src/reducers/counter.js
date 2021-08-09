/*
 * @Description: 计数器
 * @Author: 吴锦辉
 * @Date: 2021-08-06 16:38:46
 * @LastEditTime: 2021-08-06 17:12:45
 */

const initState = {
  count: 0,
};

export default (state = initState, action = {}) => {
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
};
