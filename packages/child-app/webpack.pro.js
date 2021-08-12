/*
 * @Description: webpack生产配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-12 09:25:07
 * @LastEditTime: 2021-08-12 16:21:21
 */

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

module.exports = {
  output: {
    publicPath: 'http://localhost:8081/',
  },
  mode: 'production',
  plugins: [new SpeedMeasurePlugin()],
};
