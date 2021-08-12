/*
 * @Description: webpack配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-12 09:24:08
 * @LastEditTime: 2021-08-12 15:52:19
 */

const path = require('path');
const { argv } = require('yargs');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devConfig = require('./webpack.dev.js');
const proConfig = require('./webpack.pro.js');
const { name } = require('./package');

const { env } = argv;
process.env.NODE_ENV = env;

const baseConfig = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    /** 微应用配置 */
    library: {
      name: `${name}-[name]`,
      type: 'umd',
    },
    uniqueName: `webpackJsonp_${name}`,
    globalObject: 'window',
  },
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
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|webp|woff2?|eot|ttf|otf)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: false,
              name: 'img/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
      '@img': path.resolve(__dirname, 'src/img'),
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
