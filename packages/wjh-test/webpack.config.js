/*
 * @Description: webpack配置文件
 * @Author: 吴锦辉
 * @Date: 2021-07-20 13:55:02
 * @LastEditTime: 2021-09-14 14:53:28
 */

const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',
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
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              sourceMap: true,
              resources: [path.resolve(__dirname, './src/global.scss')], // 一定是path.resolve的绝对路径
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ReactRefreshPlugin(), // 为 react-refresh 添加
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.IgnorePlugin(/\.\/locale/, /moment/),
  ],
  devServer: {
    open: true,
    port: 8080,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  resolve: {
    mainFiles: ['index.jsx', 'index.js'],
    alias: {
      '@pages': path.resolve(__dirname, 'src/pages'),
    },
  },
};
