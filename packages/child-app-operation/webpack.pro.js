/*
 * @Description: webpack生产配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-12 16:21:21
 * @LastEditTime: 2021-10-08 13:40:58
 */

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const path = require('path');
const { name } = require('./package');

module.exports = {
  output: {
    publicPath: 'http://120.78.195.150:8081/',
    path: path.resolve(__dirname, 'build'),
    /** 微应用配置 */
    library: {
      name: `${name}-[name]`,
      type: 'umd',
    },
    uniqueName: `webpackJsonp_${name}`,
    globalObject: 'window',
  },
  mode: 'production',
  plugins: [new SpeedMeasurePlugin()],
};
