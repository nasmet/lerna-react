/*
 * @Description: webpack生产配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-12 16:21:21
 * @LastEditTime: 2021-09-17 17:45:50
 */

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

module.exports = {
  mode: 'production',
  plugins: [new SpeedMeasurePlugin()],
};
