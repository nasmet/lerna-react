/*
 * @Description: watchRun事件
 * @Author: 吴锦辉
 * @Date: 2022-07-27 15:31:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-27 15:59:15
 */

class WatchRunPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.watchRun.tapAsync('WatchRunPlugin', (params, callback) => {
      console.log(
        '在监听模式下，一个新的 compilation 触发之后，但在 compilation 实际开始之前执行: ',
        params
      );

      callback();
    });
  }
}

module.exports = WatchRunPlugin;
