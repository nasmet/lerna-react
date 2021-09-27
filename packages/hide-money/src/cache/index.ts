/*
 * @Description: 本地缓存
 * @Author: 吴锦辉
 * @Date: 2021-09-15 16:37:40
 * @LastEditTime: 2021-09-27 09:18:56
 */

import Taro from '@tarojs/taro';

class CacheController {
  constructor() {
    this.map = new Map();
  }

  set(key, value) {
    this.map.set(key, value);

    Taro.setStorageSync(key, value);
  }

  get(key) {
    if (this.map.has(key)) {
      return this.map.get(key);
    }

    const value = Taro.getStorageSync(key);

    if (value) {
      this.map.set(key, value);
    }

    return value;
  }

  remove(key) {
    this.map.delete(key);

    Taro.removeStorageSync(key);
  }

  getToken() {
    return this.get('token');
  }

  setToken(value) {
    return this.set('token', value);
  }

  removeToken() {
    return this.remove('token');
  }

  getLanguage() {
    return this.get('language');
  }

  setLanguage(value) {
    return this.set('language', value);
  }
}

const cacheCtrl = new CacheController();

export default cacheCtrl;
