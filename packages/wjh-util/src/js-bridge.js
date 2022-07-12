/*
 * @Description: 桥接方法，原生h5互调方法
 * @Author: 吴锦辉
 * @Date: 2021-08-30 10:16:44
 * @LastEditTime: 2022-06-30 15:27:03
 */

class JsBridge {
  constructor() {
    this.methodHandlers = {};
    this.responseCallbacks = {};
    this.uniqueId = 1;
  }

  /**
   * @description: Native调JS方法的核心
   * @param {string} methodName 前端与Native协商好的方法名称
   * @param {function} method 执行的方法
   * @return {}
   */
  registerHandler(methodName, method) {
    this.methodHandlers[methodName] = method;
  }

  /**
   * @description: JS调Native方法的核心
   * @param {object} message
   * @param {string} message.messageName 前端与Native协商好的方法名称
   * @param {object} message.data 参数
   * @param {string} message.responseId 回调需要用到的相应标志
   * @param {function} responseCallback 响应回调
   * @return {}
   */
  callHandler(message, responseCallback) {
    if (responseCallback) {
      // eslint-disable-next-line no-plusplus
      const responseId = `cb_${this.uniqueId++}_${new Date().getTime()}`;
      this.responseCallbacks[responseId] = responseCallback;

      // eslint-disable-next-line no-param-reassign
      message.responseId = responseId;
    }

    const msg = JSON.stringify(message || {});

    if (window.WVJBInterface) {
      window.WVJBInterface.notice(msg);
    } else {
      console.warn('没有注入WVJBInterface');
    }
  }

  /**
   * @description: app端分发消息
   * @param {object} message
   * @param {string} message.responseId
   * @param {string} message.responseData
   * @return {string}
   */
  dispatchMessageFromAPP(message) {
    const { responseId, responseData, methodName, data } = message;

    const responseCallback = this.responseCallbacks[responseId];

    /** JS调原生回调 */
    if (responseId) {
      if (!responseCallback) {
        console.warn(`responseId ${responseId} 不存在`);

        return;
      }

      Reflect.deleteProperty(this.responseCallbacks, responseId);

      responseCallback(responseData);

      return;
    }

    /** 原生调JS */
    if (methodName) {
      const handler = this.methodHandlers[methodName];

      if (!handler) {
        console.warn(`methodName ${methodName} 不存在`);

        return;
      }

      handler(data);
    }
  }
}

window.WebViewJavascriptBridge = new JsBridge();

/** 注册桥接 */
function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    callback(window.WebViewJavascriptBridge);

    return;
  }

  if (window.WVJBCallbacks) {
    window.WVJBCallbacks.push(callback);

    return;
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

/**
 * @description: 注册方法给原生
 * @param {string} option.methodName
 * @param {function} option.method
 * @return {*}
 */
window.bridgeRegisterHandler = function bridgeRegisterHandler(option) {
  setupWebViewJavascriptBridge(bridge => {
    bridge.registerHandler(option.methodName, option.method);
  });
};

/**
 * @description: h5调原生
 * @param {object} option
 * @param {string} option.message
 * @param {function} option.callback
 * @return {void}
 */
window.callNativePage = function callNativePage(option) {
  setupWebViewJavascriptBridge(bridge => {
    bridge.callHandler(option.message, responseData => {
      if (option.callback) {
        option.callback(responseData);
      }
    });
  });
};
