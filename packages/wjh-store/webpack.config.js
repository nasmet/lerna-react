/*
 * @Description: webpack配置
 * @Author: 吴锦辉
 * @Date: 2021-08-09 10:38:45
 * @LastEditTime: 2021-08-10 09:46:47
 */

const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    library: {
      name: 'store',
      type: 'umd',
    },
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
    ],
  },
  resolve: {
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
  externalsType: 'umd',
};
