/*
 * @Description: webpack生产配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:20:19
 * @LastEditTime: 2021-10-15 16:53:12
 */

const path = require('path');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

module.exports = {
  output: {
    publicPath: 'http://120.78.195.150:80/',
    chunkFilename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'build'),
  },
  mode: 'production',
  plugins: [new SpeedMeasurePlugin()],
};
