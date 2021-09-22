/*
 * @Description: i18
 * @Author: 吴锦辉
 * @Date: 2021-09-22 15:11:57
 * @LastEditTime: 2021-09-22 15:24:42
 */

const initState = {};

export default (state = initState, action = {}) => {
  switch (action.type) {
    case 'set':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
