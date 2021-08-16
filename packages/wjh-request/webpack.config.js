/*
 * @Description: webpack配置
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:55:46
 * @LastEditTime: 2021-08-16 15:22:27
 */

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    library: {
      name: 'wjh-request',
      type: 'umd',
    },
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env'],
        },
      },
    ],
  },
  resolve: {
    mainFiles: ['index.jsx', 'index.js'],
  },
  externals: {
    axios: {
      commonjs: 'axios',
      commonjs2: 'axios',
      amd: 'axios',
      root: 'Axios',
    },
  },
  externalsType: 'umd',
};
