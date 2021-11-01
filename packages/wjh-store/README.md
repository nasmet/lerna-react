## 简介

状态管理容器，适用于 react

## 安装

npm i wjh-store -S

## 范例

```javascript
import React, { Component, useCallback } from 'react';
import { createContextFactory, Store } from 'wjh-store';

/** 创建一个状态容器 */
const { WrapContainer, useDispatch, useSelecor, connet } = createContextFactory();

/** action编写 */
function updateUser(payload) {
  return {
    type: 'updateUser',
    payload,
  };
}

/** 异步action范例 */
export function asyncUpdateUser(dispatch) {
  return payload => {
    setTimeout(() => {
      dispatch({
        type: 'updateUser',
        payload,
      });
    }, 1000);
  };
}

/** reducer编写 */
function user(
  state = {
    id: 1,
    name: 'jack',
  },
  action = {}
) {
  switch (action.type) {
    case 'updateUser':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

function App({ state, dispatch }) {
  return (
    <>
      <User />
    </>
  );
}

/** 函数式组件使用，类组件使用connect获取跟dva用法相同 */
function User() {
  const user = useSelecor(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      updateUser({
        name: 'jack',
      })
    );
  }, []);

  return <>{user.name}</>;
}

const reducer = { user };

const store = new Store(reducers);

const observer = (state, action) => {
  console.log('执行的 action: ', action);
  console.log('改变后的 state: ', state);
};

store.subscribe(observer);

/** store注入 */
export default WrapContainer(App, store);
```
