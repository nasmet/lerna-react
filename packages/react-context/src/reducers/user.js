/*
 * @Description: 用户属性
 * @Author: 吴锦辉
 * @Date: 2021-08-06 16:40:13
 * @LastEditTime: 2021-08-06 17:13:00
 */

const initState = {
  id: 1,
  name: 'jack',
};

export default (state = initState, action = {}) => {
  switch (action.type) {
    case 'updateUser':
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
