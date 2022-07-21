/*
 * @Description: webpack生产配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:20:19
 * @LastEditTime: 2022-07-21 11:12:54
 */

const path = require('path');
const { setUnusedWebpack, setBundleAnalyzer, setChunkName } = require('./webpack.part');

const { analyzer } = process.env;

const plugins = [setUnusedWebpack()];

if (analyzer) {
  plugins.push(setBundleAnalyzer());
}

module.exports = {
  performance: {
    hints: 'warning', // "error" or false are valid too
    maxEntrypointSize: 200 * 1024, // in bytes, default 250k
    maxAssetSize: 500 * 1024, // in bytes
  },
  output: {
    publicPath: 'http://120.78.195.150:80/',
    chunkFilename: '[name].[contenthash].js',
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  mode: 'production',
  devtool: false,
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        styles: {
          test: /\.css$/,
          name: 'styles',
          chunks: 'all',
          enforce: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: setChunkName,
          chunks: 'initial',
          priority: -10,
        },
        commons: {
          test: /[\\/]node_modules[\\/](react)/,
          name: setChunkName,
          chunks: 'all',
          priority: -20,
          reuseExistingChunk: true,
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
