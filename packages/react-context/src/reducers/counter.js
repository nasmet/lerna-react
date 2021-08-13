/*
 * @Description: 计数器
 * @Author: 吴锦辉
 * @Date: 2021-08-06 16:38:46
 * @LastEditTime: 2021-08-13 09:54:59
 */

const initState = {
  count: 0,
};

export default (state = initState, action = {}) => {
  switch (action.type) {
    case 'add':
      // eslint-disable-next-line no-case-declarations
      const count = state.count + action.payload.count || 0;

      return { ...state, count };
    case 'reduce':
      // eslint-disable-next-line no-case-declarations
      const count1 = state.count - action.payload.count || 0;

      return { ...state, count: count1 };
    default:
      return state;
  }
};
