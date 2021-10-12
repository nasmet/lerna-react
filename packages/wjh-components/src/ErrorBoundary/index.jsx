/*
 * @Description: 错误边界组件
 * @Author: 吴锦辉
 * @Date: 2021-10-11 17:07:02
 * @LastEditTime: 2021-10-11 17:10:04
 */

import React from 'react';
import { Button } from 'antd';
import styles from './index.module.scss';

export default class ErrorBoundary extends React.Component {
  /** showVConsole点击次数收集，快速点击20下显示 */
  fastClickPageCount = 0;

  timer = null;

  // eslint-disable-next-line react/no-unused-state
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true, error };
  }

  onRefreshPage = () => {
    window.location.reload();
  };

  onCollect = () => {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }

    this.fastClickPageCount += 1;

    if (this.fastClickPageCount === 20) {
      this.showVConsole();
    } else {
      this.timer = setTimeout(() => {
        this.fastClickPageCount = 0;
      }, 200);
    }
  };

  showVConsole = () => {
    const scriptElement = document.createElement('script');

    scriptElement.src = 'https://cdn.bootcss.com/vConsole/3.3.4/vconsole.min.js';

    const self = this;

    function onload() {
      if (this.readyState === 'loaded') {
        // eslint-disable-next-line no-undef
        VConsole && new VConsole();

        console.error(self.state.error);

        scriptElement.onload = null;
      }
    }

    scriptElement.onload = onload;

    document.body.appendChild(scriptElement);
  };

  render() {
    const { hasError } = this.state;

    if (hasError) {
      return (
        <div className={styles.errorPage} onClick={this.onCollect}>
          <span className={styles.tip}>检测到网站可能有更新，需要刷新页面</span>
          <Button onClick={this.onRefreshPage}>刷新</Button>
        </div>
      );
    }

    return this.props.children;
  }
}
