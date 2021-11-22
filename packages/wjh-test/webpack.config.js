/*
 * @Description: webpack配置文件
 * @Author: 吴锦辉
 * @Date: 2021-07-20 13:55:02
 * @LastEditTime: 2021-11-22 11:02:52
 */

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
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ],
  devServer: {
    hot: true,
    open: false,
    port: 8080,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: '',
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
