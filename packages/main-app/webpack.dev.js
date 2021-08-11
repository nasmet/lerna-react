/*
 * @Description: webpack开发配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-11 14:05:55
 * @LastEditTime: 2021-08-11 14:20:35
 */

const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      // Options...
    }),
    new ReactRefreshPlugin(), // 为 react-refresh 添加
  ],
  devServer: {
    hot: true,
    open: true,
  },
};
