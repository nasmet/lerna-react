/*
 * @Description: 节流请求封装
 * @Author: 吴锦辉
 * @Date: 2021-09-22 09:29:30
 * @LastEditTime: 2021-09-22 09:45:11
 */

export default class ThrottleRequest {
  constructor(time = 500) {
    /** 单位毫秒 */
    this.time = time;
    this.map = new Map();
  }

  has(url) {
    if (!this.map.has(url)) {
      this.map.set(url, Date.now());

      return false;
    }

    const diff = Date.now() - this.map.get(url);

    if (diff <= this.time) {
      return true;
    }

    this.map.set(url, Date.now());

    return false;
  }
}
