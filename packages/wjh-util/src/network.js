/*
 * @Description: 网络状态相关
 * @Author: 吴锦辉
 * @Date: 2022-07-29 10:08:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-29 10:28:26
 */

class NetworkCtrl {
  constructor() {
    this.onOnlineChange = cb => () => {
      cb(navigator.onLine ? 'online' : 'offline');
    };

    this.onNetworkChange = cb => () => {
      cb(this.getNetworkType());
    };
  }

  getNetworkType() {
    return navigator.connection.effectiveType;
  }

  registerOnline(cb) {
    window.addEventListener('online', this.onOnlineChange(cb));
    window.addEventListener('offline', this.onOnlineChange(cb));
  }

  removeOnlineEvent(cb) {
    window.removeEventListener('online', this.onOnlineChange(cb));
    window.removeEventListener('offline', this.onOnlineChange(cb));
  }

  registerNetworkChange(cb) {
    window.addEventListener('change', this.onNetworkChange(cb));
  }

  removeNetworkChangeEvent(cb) {
    window.removeEventListener('change', this.onNetworkChange(cb));
  }
}

export default new NetworkCtrl();
