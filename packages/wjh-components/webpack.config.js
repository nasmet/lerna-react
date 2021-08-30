/*
 * @Description: webpack配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-05 14:13:37
 * @LastEditTime: 2021-08-30 11:21:56
 */

const path = require('path');
const webpack = require('webpack');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    library: 'components',
    libraryTarget: 'umd',
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
  plugins: [new webpack.IgnorePlugin(/\.\/locale/, /moment/), new SpeedMeasurePlugin()],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
    },
    mainFiles: ['index.jsx', 'index.js'],
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM',
    },
    antd: {
      commonjs: 'antd',
      commonjs2: 'antd',
      amd: 'antd',
      root: 'antd',
    },
    moment: {
      commonjs: 'moment',
      commonjs2: 'moment',
      amd: 'moment',
      root: 'moment',
    },
  },
};
