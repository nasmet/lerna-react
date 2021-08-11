/*
 * @Description: webpack生产配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-11 14:06:33
 * @LastEditTime: 2021-08-11 14:30:40
 */

const path = require('path');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  mode: 'production',
  plugins: [new SpeedMeasurePlugin()],
};
