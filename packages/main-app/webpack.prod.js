/*
 * @Description: webpack生产配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:20:19
 * @LastEditTime: 2021-10-18 15:12:30
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
  devtool: 'source-map',
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  cache: {
    type: 'filesystem',
    compression: 'gzip',
    profile: true,
  },
  plugins,
};
