/*
 * @Description: webpack生产配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:20:19
 * @LastEditTime: 2021-09-17 17:46:17
 */

const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

module.exports = {
  mode: 'production',
  plugins: [new SpeedMeasurePlugin()],
};
