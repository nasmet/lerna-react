/*
 * @Description: webpack配置
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:55:46
 * @LastEditTime: 2021-09-13 17:31:29
 */

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    library: {
      name: 'wjh-routers',
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
          presets: ['@babel/env', '@babel/preset-react'],
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
    'react-router-dom': {
      commonjs: 'react-router-dom',
      commonjs2: 'react-router-dom',
      amd: 'react-router-dom',
      root: 'ReactRouterDOM',
    },
  },
  externalsType: 'umd',
};
