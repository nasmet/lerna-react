/*
 * @Description: 应用文件
 * @Author: 吴锦辉
 * @Date: 2021-07-20 13:53:24
 * @LastEditTime: 2021-08-06 12:12:44
 */

import React, { Component, useCallback } from 'react';
import { createContextFactory } from './utils/context.js';
import { addCount, reduceCount } from './actions/index.js';
import { countReducer } from './reducers/index.js';
import { LinkageDatePicker, ReactFromModule } from 'components';

const { WrapContainer, useDispatch, useSelecor, connet } = createContextFactory(
  {
    theme: 'yellow',
  }
);

console.log(ReactFromModule === React);

function App() {
  return (
    <>
      <AddCounter />
      <ReduceCounter />
      <Count />
      <AddCounter2 />
      <ReduceCounter2 />
      <Count2 />
      {/* <LinkageDatePicker /> */}
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
        +
      </button>
    </>
  );
}

function ReduceCounter() {
  const dispatch = useDispatch();

  const onReduce = useCallback(() => {
    dispatch(reduceCount(1));
  }, [dispatch]);

  return (
    <>
      <button onClick={onReduce} style={{ width: '100px', height: '60px' }}>
        -
      </button>
    </>
  );
}

function Count() {
  const count = useSelecor((state) => state.count);

  return <div>计数器：{count}</div>;
}

class AddCounter1 extends Component {
  onAdd = () => {
    this.props.addCount(1);
  };

  render() {
    return (
      <>
        <button onClick={this.onAdd} style={{ width: '100px', height: '60px' }}>
          +
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
          style={{ width: '100px', height: '60px' }}
        >
          -
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
    return <div>计数器：{this.props.count}</div>;
  }
}

const Count2 = connet(
  ({ count }) => ({
    count,
  }),
  null
)(Count1);

export default WrapContainer(App, countReducer);
