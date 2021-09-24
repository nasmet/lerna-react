/*
 * @Description: 用户信息
 * @Author: 吴锦辉
 * @Date: 2021-09-24 09:29:34
 * @LastEditTime: 2021-09-24 09:58:03
 */

const initState = {};

interface IAction {
  type?: string;
  payload?: Record<string, any>;
}

export default (state = initState, action: IAction = {}) => {
  switch (action.type) {
    case 'set':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
