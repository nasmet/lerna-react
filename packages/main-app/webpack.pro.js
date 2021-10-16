/*
 * @Description: webpack生产配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:20:19
 * @LastEditTime: 2021-10-16 14:33:52
 */

const { argv } = require('yargs');

const { progress } = argv;

let plugins = [];

if (progress) {
  const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

  plugins = [...plugins, new BundleAnalyzerPlugin()];
}

const path = require('path');

module.exports = {
  output: {
    publicPath: 'http://120.78.195.150:80/',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  mode: 'production',
  plugins,
};
