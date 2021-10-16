/*
 * @Description: 全局状态树
 * @Author: 吴锦辉
 * @Date: 2021-09-22 15:08:08
 * @LastEditTime: 2021-10-16 13:20:15
 */

import { createContextFactory, Store } from 'wjh-store';
import reducers from './reducers/index.js';

const { WrapContainer, useDispatch, useSelecor, connect } = createContextFactory();

const store = new Store(reducers);

if (process.env.NODE_ENV === 'development') {
  store.subscribe((state, action) => {
    console.log('执行的action: ', action);
    console.log('改变后的state: ', state);
  });
}

export { WrapContainer, useDispatch, useSelecor, connect, store };
