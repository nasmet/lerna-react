/*
 * @Description: webpack生产配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-13 10:52:55
 * @LastEditTime: 2021-08-13 11:00:37
 */

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

module.exports = {
  mode: 'production',
  plugins: [new SpeedMeasurePlugin()],
};
