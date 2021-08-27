/*
 * @Description: webpack开发配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-13 10:52:55
 * @LastEditTime: 2021-08-27 11:07:03
 */

const { argv } = require('yargs');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const { domain = '' } = argv;

let host = '';

switch (domain) {
  case 'dev':
    host = '';
    break;
  case 'test':
    host = '';
    break;
  case 'prf':
    host = '';
    break;
  case 'prod':
    host = '';
    break;
  default:
    host = '';
    break;
}

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
          plugins: [require.resolve('react-refresh/babel')], // 为 react-refresh 添加
        },
      },
    ],
  },
  plugins: [
    new ReactRefreshPlugin(), // 为 react-refresh 添加
  ],
  devServer: {
    port: 8080,
    hot: true,
    open: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: host,
        secure: false,
        pathRewrite: { '^/api': '' },
      },
    },
  },
};
