/*
 * @Description: 应用文件
 * @Author: 吴锦辉
 * @Date: 2021-07-20 13:53:24
 * @LastEditTime: 2021-08-26 11:08:22
 */

import React, { Component, useCallback, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createContextFactory, Store } from 'wjh-store';
import { LinkageDatePicker, NumberInput, UploadWrap, CreateQRCode } from 'wjh-components';
import RenderRouters from 'wjh-routers';
import HttpUtils from 'wjh-request';
import { Form, Button } from 'antd';
import reducers from './reducers/index.js';
import { addCount, asyncReduceAction } from './actions/counter.js';
import styles from './app.module.scss';

const httpUtils = new HttpUtils({ baseURL: 'https://www.ituring.com.cn' });

function Layout(props) {
  const [form] = Form.useForm();

  useEffect(() => {
    const [tastId, execute] = httpUtils.get('/');

    execute
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.error(e);
      });

    return () => httpUtils.cancelRequestById(tastId);
  }, []);

  return (
    <div>
      <AddCounter />
      <ReduceCounter />
      <Count />
      <Form form={form}>
        <LinkageDatePicker form={form} />
        <NumberInput />
      </Form>
      <UploadWrap accept=".xls,.xlsx">
        <Button type="primary">上传文件</Button>
      </UploadWrap>
      <CreateQRCode />
      <div className={styles.word}>移动端html font-size动态计算设置</div>
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

const { WrapContainer, useDispatch, useSelecor } = createContextFactory();

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

const store = new Store(reducers);

const observer = (state, action) => {
  console.log('执行的action: ', action);
  console.log('改变后的state: ', state);
};

store.subscribe(observer);

export default WrapContainer(App, store);
