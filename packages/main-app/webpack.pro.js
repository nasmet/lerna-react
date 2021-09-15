/*
 * @Description: webpack生产配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:20:19
 * @LastEditTime: 2021-08-16 09:20:33
 */

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

module.exports = {
  output: {
    publicPath: 'http://localhost:8080/',
  },
  mode: 'production',
  plugins: [new SpeedMeasurePlugin()],
};
