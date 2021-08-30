/*
 * @Description: 桥接方法，原生h5互调方法
 * @Author: 吴锦辉
 * @Date: 2021-08-30 10:16:44
 * @LastEditTime: 2021-08-30 10:21:18
 */

/* eslint-disable no-undef */

export default function initJsBridge() {
  // eslint-disable-next-line consistent-return
  function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      return callback(WebViewJavascriptBridge);
    }

    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }

    window.WVJBCallbacks = [callback];

    const WVJBIframe = document.createElement('iframe');

    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(() => {
      document.documentElement.removeChild(WVJBIframe);
    }, 0);
  }

  // 原生调h5
  window.bridgeRegisterHandler = function bridgeRegisterHandler(option) {
    setupWebViewJavascriptBridge(bridge => {
      // oc调用Js的方法，并且有返回函数   callHeandler(方法名与app端保持一致)  data（IOS传过来的数据）
      bridge.registerHandler(option.method, (data, responseCallback) => {
        // js回调函数返回数据
        if (option.callback) {
          option.callback(data);
        }

        const responseData = { success: true };

        responseCallback(responseData, data);
      });
    });
  };

  /**
   * @description: h5调原生
   * @param {object} option
   * @param {string} option.method
   * @param {object} option.data
   * @param {function} option.callback
   * @return {void}
   */
  window.callNativePage = function callNativePage(option) {
    setupWebViewJavascriptBridge(() => {
      window.WebViewJavascriptBridge.callHandler(option.method, option.data, responseData => {
        if (option.callback) {
          option.callback(responseData);
        }
      });
    });
  };
}
