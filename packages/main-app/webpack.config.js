/*
 * @Description: webpack配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:19:32
 * @LastEditTime: 2022-07-13 13:52:31
 */

const { argv } = require('yargs');

const { env } = argv;

const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const threadLoader = require('thread-loader');

const loaderPoolOptions = {
  // 池选项，例如传递给 loader 选项
  // 必须匹配 loader 选项才能启动正确的池

  // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)，或者，
  // 在 require('os').cpus() 是 undefined 时回退至 1
  workers: 2,

  // 一个 worker 进程中并行执行工作的数量
  // 默认为 20
  workerParallelJobs: 50,

  // 额外的 node.js 参数
  workerNodeArgs: ['--max-old-space-size=1024'],

  // 允许重新生成一个僵死的 work 池
  // 这个过程会降低整体编译速度
  // 并且开发环境应该设置为 false
  poolRespawn: false,

  // 闲置时定时删除 worker 进程
  // 默认为 500（ms）
  // 可以设置为无穷大，这样在监视模式(--watch)下可以保持 worker 持续存在
  poolTimeout: 2000,

  // 池分配给 worker 的工作数量
  // 默认为 200
  // 降低这个数值会降低总体的效率，但是会提升工作分布更均一
  poolParallelJobs: 50,

  // 池的名称
  // 可以修改名称来创建其余选项都一样的池
  name: 'loader-pool',
};

/* node-sass 中有个来自 Node.js 线程池的阻塞线程的 bug。
  当使用 thread-loader 时，需要设置 workerParallelJobs: 2 */
const sassLoaderPoolOptions = {
  ...loaderPoolOptions,
  workerParallelJobs: 2,
};

threadLoader.warmup(loaderPoolOptions, [
  // 加载模块
  // 可以是任意模块，例如
  'babel-loader',
]);

threadLoader.warmup(sassLoaderPoolOptions, ['sass-loader']);

const baseConfig = {
  entry: './src/index.js',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: loaderPoolOptions,
          },
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/env', '@babel/preset-react'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'thread-loader',
            options: sassLoaderPoolOptions,
          },
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
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
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
    buildConfig = require('./webpack.prod.js');

    break;
  case 'development':
    buildConfig = require('./webpack.dev.js');

    break;
  default:
    throw new Error('不存在该环境的运行');
}

module.exports = merge(baseConfig, buildConfig);
