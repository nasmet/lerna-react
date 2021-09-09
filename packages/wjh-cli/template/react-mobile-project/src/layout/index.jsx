/*
 * @Description: 根路由组件
 * @Author: 吴锦辉
 * @Date: 2021-08-11 14:40:36
 * @LastEditTime: 2021-08-26 09:40:21
 */

import React from 'react';
import styles from './index.module.scss';

export default function BasicLayout(props) {
  return (
    <ErrorBoundary>
      <div>欢迎使用该脚手架，联系方式：手机号：15770938126， 微信号：nasmet，有问题可以联系</div>
      <div>{props.children}</div>
    </ErrorBoundary>
  );
}

class ErrorBoundary extends React.Component {
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
          <img className={styles.logo} src="" alt="logo" />
          <span className={styles.tip}>检测到网站可能有更新，需要刷新页面</span>
          <button className={styles.btn} onClick={this.onRefreshPage}>
            刷新
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
