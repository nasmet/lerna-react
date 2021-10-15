/*
 * @Description: webpack开发配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-13 10:52:55
 * @LastEditTime: 2021-10-15 17:26:59
 */

const { argv } = require('yargs');

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
        },
      },
    ],
  },
  plugins: [],
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
