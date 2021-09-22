/*
 * @Description: 本地缓存
 * @Author: 吴锦辉
 * @Date: 2021-09-15 16:37:40
 * @LastEditTime: 2021-09-22 16:35:45
 */

class CacheController {
  constructor() {
    this.map = new Map();
  }

  set(key, value) {
    this.map.set(key, value);

    localStorage.setItem(key, value);
  }

  get(key) {
    if (this.map.has(key)) {
      return this.map.get(key);
    }

    const value = localStorage.getItem(key);

    if (value) {
      this.map.set(key, value);
    }

    return value;
  }

  remove(key) {
    this.map.delete(key);

    localStorage.removeItem(key);
  }

  getToken() {
    return this.get('token');
  }

  setToken(value) {
    return this.set('token', value);
  }

  getLanguage() {
    return this.get('language');
  }

  setLanguage(value) {
    return this.set('language', value);
  }

  removeToken() {
    return this.remove('token');
  }
}

const cacheCtrl = new CacheController();

window.cacheCtrl = cacheCtrl;

export default cacheCtrl;
