/*
 * @Description: 全局状态树
 * @Author: 吴锦辉
 * @Date: 2021-09-22 15:08:08
 * @LastEditTime: 2021-09-22 15:50:51
 */

import { createContextFactory, Store } from 'wjh-store';
import reducers from './reducers/index.js';

const { WrapContainer, useDispatch, useSelecor, connect } = createContextFactory();

const store = new Store(reducers);

const observer = (state, action) => {
  console.log('执行的action: ', action);
  console.log('改变后的state: ', state);
};

store.subscribe(observer);

export { WrapContainer, useDispatch, useSelecor, connect, store };
