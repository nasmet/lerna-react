/*
 * @Description: webpack开发配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:19:56
 * @LastEditTime: 2022-07-19 16:16:06
 */

const webpack = require('webpack');

module.exports = {
  output: {
    publicPath: '/',
  },
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
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
