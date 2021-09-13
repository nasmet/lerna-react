/*
 * @Description: webpack配置
 * @Author: 吴锦辉
 * @Date: 2021-08-17 09:10:46
 * @LastEditTime: 2021-09-13 14:49:57
 */

const path = require('path');

module.exports = {
  entry: './build/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    library: {
      name: 'wjh-hooks',
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
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
  },
  externalsType: 'umd',
};
