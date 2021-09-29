/*
 * @Description: 本地缓存
 * @Author: 吴锦辉
 * @Date: 2021-09-15 16:37:40
 * @LastEditTime: 2021-09-29 13:26:19
 */

import Taro from '@tarojs/taro';

interface IHideRoomInfo {
  roomId?: string;
  itemId?: string;
  money?: string;
}

interface IFideRoomInfo {
  roomId?: string;
  itemId?: string;
}

class CacheController {
  map: Map<string, any>;
  mode: any;
  hideRoomInfo: IHideRoomInfo;
  findRoomInfo: IFideRoomInfo;

  constructor() {
    this.map = new Map();
    this.mode = -1;
    this.hideRoomInfo = {};
    this.findRoomInfo = {};
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

  setMode(value) {
    this.mode = value;
  }

  getMode() {
    return this.mode;
  }

  setHideRoomInfo(value) {
    this.hideRoomInfo = { ...this.hideRoomInfo, ...value };
  }

  getHideRoomInfo() {
    return this.hideRoomInfo;
  }

  setFindRoomInfo(value) {
    this.findRoomInfo = { ...this.findRoomInfo, ...value };
  }

  getFindRoomInfo() {
    return this.findRoomInfo;
  }
}

const cacheCtrl = new CacheController();

export default cacheCtrl;
