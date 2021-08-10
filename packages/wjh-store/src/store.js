/*
 * @Description: store
 * @Author: 吴锦辉
 * @Date: 2021-08-06 17:54:08
 * @LastEditTime: 2021-08-09 10:06:33
 */

class Store {
  constructor(reducer) {
    this._reducer = null;
    this._state = {};
    this._observers = [];

    this._init(reducer);
  }

  _init(reducer) {
    if (typeof reducer === 'function') {
      this._reducer = this.handleSingleReducer(reducer);

      return;
    }

    if (typeof reducer === 'object') {
      this._reducer = this.mergeReducer(reducer);

      return;
    }

    throw new Error('传入参数格式有误');
  }

  getState() {
    return this._state;
  }

  getReducer() {
    return this._reducer;
  }

  handleSingleReducer(reducer) {
    this._state = reducer();

    return (state, action) => {
      this._state = reducer(state, action);

      this.notify(this._state, action);

      return this._state;
    };
  }

  /**
   * @description: 合并多个reducer
   * @param {object} reducers
   * @return {object}
   */
  mergeReducer(reducers) {
    Object.keys(reducers).forEach((key) => {
      Object.assign(this._state, {
        [key]: reducers[key](),
      });
    });

    return (state, action) => {
      this._state = { ...state };

      Object.keys(reducers).forEach((key) => {
        Object.assign(this._state, {
          [key]: reducers[key](this._state[key], action),
        });
      });

      this.notify(this._state, action);

      return this._state;
    };
  }

  notify(state, action) {
    if (this._observers.length === 0) {
      return;
    }

    this._observers.forEach((cb) => {
      cb(state, action);
    });
  }

  subscribe(fn) {
    if (typeof fn !== 'function') {
      throw new Error('传入参数格式有误');
    }

    this._observers.push(fn);
  }

  unsubscribe(fn) {
    if (!fn) {
      this._observers = [];

      return;
    }

    const observers = this._observers;

    if (fn && typeof fn === 'function') {
      for (let i = 0, len = observers.length; i < len; i++) {
        if (fn === observers[i]) {
          observers.splice(i, 1);

          i--;
          len--;
          break;
        }
      }
    }
  }
}

export default Store;
