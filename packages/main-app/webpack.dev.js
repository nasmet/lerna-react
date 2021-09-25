/*
 * @Description: webpack开发配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:19:56
 * @LastEditTime: 2021-09-25 17:16:26
 */

const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/preset-react'],
          // plugins: [require.resolve('react-refresh/babel')], // 为 react-refresh 添加
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      // Options...
    }),
    // new ReactRefreshPlugin(), // 为 react-refresh 添加
  ],
  devServer: {
    hot: true,
    open: true,
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
