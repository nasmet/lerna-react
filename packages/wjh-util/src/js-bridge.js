/*
 * @Description: 桥接方法，原生h5互调方法
 * @Author: 吴锦辉
 * @Date: 2021-08-30 10:16:44
 * @LastEditTime: 2021-09-10 15:56:59
 */

(() => {
  if (window.WebViewJavascriptBridge) {
    return;
  }

  const messageHandlers = {};
  const responseCallbacks = {};
  let uniqueId = 1;

  function _doSend(message, responseCallback) {
    if (responseCallback) {
      uniqueId += 1;

      const callbackId = `cb_${uniqueId}_${new Date().getTime()}`;

      responseCallbacks[callbackId] = responseCallback;
      message['callbackId'] = callbackId;
    }

    const msg = JSON.stringify(message || {});

    if (window.WVJBInterface) {
      window.WVJBInterface.notice(msg);
    } else {
      console.warn('没有注入WVJBInterface');
    }
  }

  function _dispatchMessageFromJava(message) {
    let responseCallback;

    if (message.responseId) {
      responseCallback = responseCallbacks[message.responseId];

      if (!responseCallback) {
        return;
      }

      responseCallback(message.responseData);
      delete responseCallbacks[message.responseId];
    } else {
      if (message.callbackId) {
        const callbackResponseId = message.callbackId;

        responseCallback = responseData => {
          _doSend({
            handlerName: message.handlerName,
            responseId: callbackResponseId,
            responseData,
          });
        };
      }

      const handler = messageHandlers[message.handlerName];

      if (!handler) {
        console.warn('no handler for message from java', message);
      } else {
        handler(message.data, responseCallback);
      }
    }
  }

  const bridge = {
    registerHandler(handlerName, handler) {
      messageHandlers[handlerName] = handler;
    },
    callHandler(handlerName, data, responseCallback) {
      _doSend(
        {
          handlerName,
          data,
        },
        responseCallback
      );
    },
    disableJavascriptAlertBoxSafetyTimeout(disable) {
      this.callHandler('_disableJavascriptAlertBoxSafetyTimeout', disable !== false);
    },
    _handleMessageFromJava(messageJSON) {
      _dispatchMessageFromJava(messageJSON);
    },
    hasNativeMethod(name, responseCallback) {
      this.callHandler('_hasNativeMethod', name, responseCallback);
    },
  };

  bridge.registerHandler('_hasJavascriptMethod', (data, responseCallback) => {
    responseCallback(!!messageHandlers[data]);
  });

  const callbacks = window.WVJBCallbacks;

  delete window.WVJBCallbacks;

  if (callbacks) {
    for (let i = 0; i < callbacks.length; i += 1) {
      callbacks[i](bridge);
    }
  }

  window.WebViewJavascriptBridge = bridge;
})();

export default function initJsBridge() {
  // eslint-disable-next-line consistent-return
  function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge);
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
