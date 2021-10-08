/*
 * @Description: webpack开发配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:19:56
 * @LastEditTime: 2021-10-08 09:21:31
 */

const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  output: {
    publicPath: 'http://localhost:8080/',
    chunkFilename: '[name].[chunkhash].js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/env', '@babel/preset-react'],
          // plugins: [require.resolve('react-refresh/babel')], // 为 react-refresh 添加
        },
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      // Options...
    }),
    // new ReactRefreshPlugin(), // 为 react-refresh 添加
  ],
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    // host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api/operation': {
        target: 'http://localhost:3001',
        secure: false,
      },
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
};
