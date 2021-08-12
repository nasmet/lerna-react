/*
 * @Description: webpack开发配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-11 14:05:55
 * @LastEditTime: 2021-08-12 16:19:55
 */

const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8080/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/preset-react'],
          plugins: [require.resolve('react-refresh/babel')], // 为 react-refresh 添加
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      // Options...
    }),
    new ReactRefreshPlugin(), // 为 react-refresh 添加
  ],
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    port: 8080,
  },
};
