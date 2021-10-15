/*
 * @Description: webpack开发配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:19:56
 * @LastEditTime: 2021-10-15 17:26:03
 */

const webpack = require('webpack');

module.exports = {
  mode: 'development',
  output: {
    publicPath: 'http://localhost:8080/',
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
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin({
      // Options...
    }),
  ],
  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    port: 8080,
  },
};
