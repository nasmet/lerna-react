/*
 * @Description: webpack开发配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-05 14:48:52
 * @LastEditTime: 2021-08-05 15:14:15
 */

const path = require('path');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      // Options...
    }),
    new ReactRefreshPlugin(), // 为 react-refresh 添加
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
  ],
  devServer: {
    hot: true,
    open: true,
  },
};
