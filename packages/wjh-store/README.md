## description

基于 useContext 和 useReducer 实现的状态管理

## 使用说明

createContextFactory 创建上下文工厂，返回一个对象，对象里面有 WrapContainer, useDispatch, useSelecor, connet 这个属性。具体使用参照范例。

Store 是一个状态存储的类，创建 store 对象需要 reducer 参数，reducer 支持单个和多个，多个以对象的方式传递

## 范例

```javascript
import React, { Component, useCallback } from 'react';
import { createContextFactory, Store } from 'wjh-store';

/** action编写 */
function updateUser(payload) {
  return {
    type: 'updateUser',
    payload,
  };
}

function addCount(value) {
  return {
    type: 'add',
    payload: {
      count: value,
    },
  };
}

/** 异步action范例 */
export function asyncAddCount(dispatch) {
  return value => {
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

/** reducer编写 */
const initCountState = {
  count: 0,
};

function counter(state = initCountState, action = {}) {
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

const initUserState = {
  id: 1,
  name: 'jack',
};

function user(state = initUserState, action = {}) {
  switch (action.type) {
    case 'updateUser':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}

const { WrapContainer, useDispatch, useSelecor, connet } = createContextFactory();

function App() {
  return (
    <>
      <AddCounter />
      <Count />
      <AddCounter2 />
      <Count2 />
    </>
  );
}

function AddCounter() {
  const dispatch = useDispatch();

  const onAdd = useCallback(() => {
    dispatch(addCount(1));
  }, [dispatch]);

  return (
    <>
      <button onClick={onAdd} style={{ width: '100px', height: '60px' }}>
        {' '}
        +
      </button>
    </>
  );
}

function Count() {
  const counter = useSelecor(state => state.counter);

  return <div>计数器：{counter.count}</div>;
}

class AddCounter1 extends Component {
  onAdd = () => {
    this.props.addCount(1);
  };

  render() {
    return (
      <>
        <button onClick={this.onAdd} style={{ width: '100px', height: '60px' }}>
          {' '}
          +
        </button>
      </>
    );
  }
}

const AddCounter2 = connet(null, dispatch => ({
  addCount(value) {
    dispatch(addCount(value));
  },
}))(AddCounter1);

class Count1 extends Component {
  render() {
    return <div>计数器：{this.props.counter.count}</div>;
  }
}

const Count2 = connet(
  ({ counter }) => ({
    counter,
  }),
  null
)(Count1);

const reducer = { user, counter };

const store = new Store(reducers);

const observer = (state, action) => {
  console.log('执行的 action: ', action);
  console.log('改变后的 state: ', state);
};

store.subscribe(observer);

export default WrapContainer(App, store);
```
