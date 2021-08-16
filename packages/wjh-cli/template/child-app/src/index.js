/*
 * @Description: 渲染入口文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:26:31
 * @LastEditTime: 2021-08-16 09:26:31
 */

import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './app';
import './public-path';

function render(props) {
  const { container } = props;

  ReactDOM.render(
    <App />,
    container ? container.querySelector('#app') : document.querySelector('#app')
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[react16] react app bootstraped');
}

export async function mount(props) {
  console.log('[react16] props from main framework', props);
  render(props);
}

export async function unmount(props) {
  const { container } = props;

  ReactDOM.unmountComponentAtNode(
    container ? container.querySelector('#app') : document.querySelector('#app')
  );
}
