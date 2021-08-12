/* eslint-disable camelcase */
/*
 * @Description: 子应用publicPath配置
 * @Author: wujinhui
 * @Date: 2021-08-12 09:34:30
 * @LastEditTime: 2021-08-12 09:39:26
 */

if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
