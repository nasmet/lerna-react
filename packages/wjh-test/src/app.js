/*
 * @Description: 应用文件
 * @Author: 吴锦辉
 * @Date: 2021-07-20 13:53:24
 * @LastEditTime: 2021-08-16 10:43:18
 */

import React, { Component, useCallback } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createContextFactory, Store } from 'wjh-store';
import { LinkageDatePicker, NumberInput, UploadWrap, CreateQRCode } from 'wjh-components';
import RenderRouters from 'wjh-routers';
import { Form, Button } from 'antd';
import reducers from './reducers/index.js';
import { addCount, reduceCount, asyncReduceAction } from './actions/counter.js';

const { WrapContainer, useDispatch, useSelecor, connet } = createContextFactory();

function Layout(props) {
  const [form] = Form.useForm();

  return (
    <div>
      <AddCounter />
      <ReduceCounter />
      <Count />
      <AddCounter2 />
      <ReduceCounter2 />
      <Count2 />
      <Form form={form}>
        <LinkageDatePicker form={form} />
        <NumberInput />
      </Form>
      <UploadWrap accept=".xls,.xlsx">
        <Button type="primary">上传文件</Button>
      </UploadWrap>
      <CreateQRCode />
      {props.children}
    </div>
  );
}

/**
 * 路由包装，对路由做一些拦截
 * @param  {ReactNode} options.children 子节点
 * @return {ReactNode}
 */
const WrapperComponent = ({ children }) => {
  return children;
};

const routerConfig = [
  // 分组路由，children 里的路由会将父节点的 Component 作为布局组件
  {
    path: '/',
    Component: Layout,
    children: [],
  },
];

function App() {
  return (
    <BrowserRouter>
      <RenderRouters routerConfig={routerConfig} />
    </BrowserRouter>
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
    asyncReduceAction(dispatch)(1);
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

class ReduceCounter1 extends Component {
  onReduce = () => {
    this.props.reduceCount(1);
  };

  render() {
    return (
      <>
        <button onClick={this.onReduce} style={{ width: '100px', height: '60px' }}>
          -
        </button>
      </>
    );
  }
}

const ReduceCounter2 = connet(null, dispatch => ({
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
  console.log('执行的action: ', action);
  console.log('改变后的state: ', state);
};

store.subscribe(observer);

export default WrapContainer(App, store);
