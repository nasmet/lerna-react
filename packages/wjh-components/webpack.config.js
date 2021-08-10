/*
 * @Description: webpack配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-05 14:13:37
 * @LastEditTime: 2021-08-05 17:07:12
 */

const path = require('path');
const { argv } = require('yargs');
const { merge } = require('webpack-merge');
const webpack = require('webpack');
const devConfig = require('./webpack.dev.js');
const proConfig = require('./webpack.pro.js');

const env = argv.env;
const baseConfig = {
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
  plugins: [new webpack.IgnorePlugin(/\.\/locale/, /moment/)],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
    },
    mainFiles: ['index.jsx', 'index.js'],
  },
};

let buildConfig;

switch (env) {
  case 'production':
    buildConfig = proConfig;

    break;
  case 'development':
    buildConfig = devConfig;

    break;
  default:
    throw new Error('不存在该环境的运行');
}

module.exports = merge(baseConfig, buildConfig);
