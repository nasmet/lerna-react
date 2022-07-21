/*
 * @Description: webpack开发配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:19:56
 * @LastEditTime: 2022-07-21 13:40:03
 */

const webpack = require('webpack');

module.exports = {
  output: {
    publicPath: '/',
  },
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
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
