/*
 * @Description: 应用文件
 * @Author: 吴锦辉
 * @Date: 2021-07-20 13:53:24
 * @LastEditTime: 2021-08-30 14:37:43
 */

import React, { Component, useCallback, useEffect, useMemo } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createContextFactory, Store } from 'wjh-store';
import { ConfigForm, UploadWrap, CreateQRCode } from 'wjh-components';
import RenderRouters from 'wjh-routers';
import HttpUtils from 'wjh-request';
import { Form, Button } from 'antd';
import reducers from './reducers/index.js';
import { addCount, asyncReduceAction } from './actions/counter.js';
import styles from './app.module.scss';

// const httpUtils = new HttpUtils({ baseURL: 'https://www.ituring.com.cn' });

function Layout(props) {
  useEffect(() => {
    // const [tastId, execute] = httpUtils.get('/');
    // execute
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(e => {
    //     console.error(e);
    //   });
    // return () => httpUtils.cancelRequestById(tastId);
  }, []);

  const configs = useMemo(() => {
    const rules = [{ required: true }];

    return [
      {
        cmpType: 'input',
        wrapProps: {
          name: 'name',
          label: '姓名',
          rules,
        },
      },
      {
        cmpType: 'input',
        wrapProps: {
          name: 'age',
          label: '年龄',
          rules,
        },
      },
      {
        cmpType: 'select',
        wrapProps: {
          name: 'gender',
          label: '性别',
          rules,
        },
        cmpProps: {
          options: [
            {
              label: '男',
              value: 1,
            },
            {
              label: '女',
              value: 2,
            },
          ],
        },
      },
      {
        cmpType: 'input',
        wrapProps: {
          name: 'weight',
          label: '身高',
          rules,
        },
      },
      {
        cmpType: 'datepicker',
        wrapProps: {
          name: 'date',
          label: '出生日期',
          rules,
        },
      },
      {
        cmpType: 'rangepicker',
        wrapProps: {
          name: 'range',
          label: '范围',
          rules,
        },
      },
      {
        cmpType: 'checkbox',
        wrapProps: {
          name: 'favorite',
          label: '喜爱',
          rules,
        },
        cmpProps: {
          options: [
            {
              label: '电影',
              value: 2,
            },
            {
              label: '游戏',
              value: 3,
            },
          ],
        },
      },
      {
        cmpType: 'radio',
        wrapProps: {
          name: 'color',
          label: '颜色',
          rules,
        },
        cmpProps: {
          options: [
            {
              label: '蓝',
              value: 1,
            },
            {
              label: '青',
              value: 2,
            },
          ],
        },
      },
    ];
  }, []);

  return (
    <div>
      <ConfigForm configs={configs} col={3} gutter={[32, 8]} />
      {/* <AddCounter />
      <ReduceCounter />
      <Count />
      <UploadWrap accept=".xls,.xlsx">
        <Button type="primary">上传文件</Button>
      </UploadWrap>
      <CreateQRCode />
      <div className={styles.word}>移动端html font-size动态计算设置</div> */}
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
