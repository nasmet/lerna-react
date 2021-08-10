/*
 * @Description: webpack生产配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-05 14:49:04
 * @LastEditTime: 2021-08-10 10:27:59
 */

const path = require('path');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    library: 'components',
    libraryTarget: 'umd',
  },
  mode: 'production',
  plugins: [new SpeedMeasurePlugin()],
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
