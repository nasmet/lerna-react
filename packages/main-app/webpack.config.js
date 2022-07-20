/*
 * @Description: webpack配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:19:32
 * @LastEditTime: 2022-07-20 16:13:32
 */

const { argv } = require('yargs');

const { env } = argv;

const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');
const glob = require('glob');
const {
  setFreeVariable,
  fontLoader,
  imageLoader,
  sassResourcesLoader,
  sassLoader,
  postcssLoader,
  cssLoader,
  babelLoader,
  sassThreadLoader,
  babelThreadLoader,
} = require('./webpack.part');

const baseConfig = {
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new PurgeCSSPlugin({
      // 这里只针对名称为styles的chunk, 主要优化antd的样式
      paths: glob.sync(path.join(__dirname, 'src/**/*'), { nodir: true }),
      only: ['styles'],
    }),
    setFreeVariable({
      __name__: 'wujinhui',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [babelThreadLoader(), babelLoader()],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, cssLoader(), postcssLoader()],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          cssLoader(),
          postcssLoader(),
          sassThreadLoader(),
          sassLoader(),
          sassResourcesLoader(['./src/global.scss']),
        ],
      },
      imageLoader(15000),
      fontLoader(),
    ],
  },
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@cache': path.resolve(__dirname, 'src/cache'),
      '@routerjump': path.resolve(__dirname, 'src/router-jump'),
      '@theme': path.resolve(__dirname, 'src/theme'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@i18': path.resolve(__dirname, 'src/i18'),
      '@config': path.resolve(__dirname, 'src/config'),
    },
    mainFiles: ['index.jsx', 'index.js'],
  },
};

let buildConfig;

switch (env) {
  case 'production':
    // eslint-disable-next-line global-require
    buildConfig = require('./webpack.prod');

    break;
  case 'development':
    // eslint-disable-next-line global-require
    buildConfig = require('./webpack.dev');

    break;
  default:
    throw new Error('不存在该环境的运行');
}

module.exports = merge(baseConfig, buildConfig);
