/*
 * @Description: webpack配置文件
 * @Author: 吴锦辉
 * @Date: 2021-07-20 13:55:02
 * @LastEditTime: 2021-08-16 15:27:48
 */

const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

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
        use: ['style-loader', 'css-loader', 'sass-loader'],
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
  },
  resolve: {
    mainFiles: ['index.jsx', 'index.js'],
  },
};
