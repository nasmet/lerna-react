/* eslint-disable camelcase */
/*
 * @Description: 子应用publicPath配置
 * @Author: wujinhui
 * @Date: 2021-08-16 09:27:01
 * @LastEditTime: 2021-08-16 09:27:01
 */

if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
