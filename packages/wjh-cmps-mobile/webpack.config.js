/*
 * @Description: webpack配置文件
 * @Author: 吴锦辉
 * @Date: 2021-09-09 09:02:31
 * @LastEditTime: 2021-09-09 09:47:44
 */

const path = require('path');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    library: 'wjh-cmps-mobile',
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
  plugins: [new SpeedMeasurePlugin()],
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
  },
};
