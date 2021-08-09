# description

基于 useContext 和 useReducer 实现的状态管理

# 使用说明

createContextFactory 创建上下文工厂，返回一个对象，对象里面有 WrapContainer, useDispatch, useSelecor, connet 这个属性。具体使用参照范例。

Store 是一个状态存储的类，创建 store 对象需要 reducer 参数，reducer 支持单个和多个，多个参数格式是 object 对象

# 范例

import React, { Component, useCallback } from 'react';
import { createContextFactory, Store } from 'wjh-store';
import reducers from './reducers/index.js';
import { addCount, reduceCount, asyncReduceAction } from './actions/counter.js';

const { WrapContainer, useDispatch, useSelecor, connet } =
createContextFactory();

function App() {
return (
<>
<AddCounter />
<ReduceCounter />
<Count />
<AddCounter2 />
<ReduceCounter2 />
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
<button onClick={onAdd} style={{ width: '100px', height: '60px' }}> +
</button>
</>
);
}

function ReduceCounter() {
const dispatch = useDispatch();

const onReduce = useCallback(() => {
asyncReduceAction(dispatch)(1);
}, [dispatch]);

return (
<>
<button onClick={onReduce} style={{ width: '100px', height: '60px' }}> -
</button>
</>
);
}

function Count() {
const counter = useSelecor((state) => state.counter);

return <div>计数器：{counter.count}</div>;
}

class AddCounter1 extends Component {
onAdd = () => {
this.props.addCount(1);
};

render() {
return (
<>
<button onClick={this.onAdd} style={{ width: '100px', height: '60px' }}> +
</button>
</>
);
}
}

const AddCounter2 = connet(null, (dispatch) => ({
addCount(value) {
dispatch(addCount(value));
},
}))(AddCounter1);

class ReduceCounter1 extends Component {
onReduce = () => {
this.props.reduceCount(1);
};

render() {
return (
<>
<button
onClick={this.onReduce}
style={{ width: '100px', height: '60px' }} > -
</button>
</>
);
}
}

const ReduceCounter2 = connet(null, (dispatch) => ({
reduceCount(value) {
dispatch(reduceCount(value));
},
}))(ReduceCounter1);

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

const store = new Store(reducers);

const observer = (state, action) => {
console.log('执行的 action: ', action);
console.log('改变后的 state: ', state);
};

store.subscribe(observer);

export default WrapContainer(App, store);
