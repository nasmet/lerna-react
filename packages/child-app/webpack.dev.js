/*
 * @Description: webpack开发配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-12 09:24:42
 * @LastEditTime: 2021-08-12 15:02:59
 */

/** 微应用devServer需要的配置 */
const mircroDevServerConfig = {
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  hot: false,
  watchContentBase: false,
  liveReload: false,
  injectClient: false,
  historyApiFallback: true,
};

module.exports = {
  output: {
    publicPath: '/',
  },
  mode: 'development',
  devServer: {
    port: 8081,
    ...mircroDevServerConfig,
  },
};
