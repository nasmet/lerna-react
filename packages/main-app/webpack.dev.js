/*
 * @Description: webpack开发配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:19:56
 * @LastEditTime: 2022-07-27 16:23:08
 */

const webpack = require('webpack');
const EnvironmentPlugin = require('./plugins/environment');
// const WatchRunPlugin = require('./plugins/watch-run');

module.exports = {
  output: {
    publicPath: '/',
  },
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new EnvironmentPlugin({
      name: 'EnvironmentPlugin',
    }),
    /** node版本兼容问题 */
    // new WatchRunPlugin({
    //   name: 'WatchRunPlugin',
    // }),
  ],
  cache: {
    type: 'memory',
    maxGenerations: 1,
  },
  devServer: {
    hot: true,
    open: false,
    historyApiFallback: true,
    port: 8080,
    proxy: {
      '/api/operation': {
        target: 'http://localhost:3001',
        secure: false,
      },
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
};
