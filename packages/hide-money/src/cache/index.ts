/*
 * @Description: 本地缓存
 * @Author: 吴锦辉
 * @Date: 2021-09-15 16:37:40
 * @LastEditTime: 2021-09-28 17:53:17
 */

import Taro from '@tarojs/taro';

class CacheController {
  map: Map<string, any>;

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

  setSystemInfo() {
    const systemInfo = Taro.getSystemInfoSync();

    this.map.set('systemInfo', systemInfo);
  }

  getSystemInfo() {
    if (!this.map.has('systemInfo')) {
      this.setSystemInfo();
    }

    return this.map.get('systemInfo') || {};
  }

  setUserInfo(value) {
    return this.set('user', value);
  }

  getUserInfo() {
    return this.get('user');
  }

  setItemId(value) {
    this.map.set('itemId', value);
  }

  getItemId() {
    return this.map.get('itemId');
  }

  removeItemId() {
    this.map.delete('itemId');
  }

  setRoomInfo(value) {
    this.map.set('roomInfo', value);
  }

  getRoomInfo() {
    return this.map.get('roomInfo');
  }

  setHideRoomId(value) {
    this.map.set('roomId', value);
  }

  getHideRoomId() {
    return this.map.get('roomId');
  }

  /** 1: hide 2: find */
  setMode(value) {
    this.map.set('mode', value);
  }

  getMode() {
    return this.map.get('mode');
  }
}

const cacheCtrl = new CacheController();

export default cacheCtrl;
