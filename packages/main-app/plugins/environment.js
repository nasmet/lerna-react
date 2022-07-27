/*
 * @Description: environment事件
 * @Author: 吴锦辉
 * @Date: 2022-07-27 15:31:32
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-27 16:11:19
 */

class EnvironmentPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.environment.tap('EnvironmentPlugin', params => {
      console.log('在编译器准备环境时调用，时机就在配置文件中初始化插件之后: ', params);
    });
  }
}

module.exports = EnvironmentPlugin;
