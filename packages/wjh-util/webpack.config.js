/*
 * @Description: webpack配置
 * @Author: 吴锦辉
 * @Date: 2021-08-27 11:34:35
 * @LastEditTime: 2021-08-27 11:35:40
 */

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    library: {
      name: 'utils',
      type: 'umd',
    },
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env'],
        },
      },
    ],
  },
  resolve: {
    mainFiles: ['index.js'],
  },
};
