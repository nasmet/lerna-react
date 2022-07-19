/*
 * @Description: webpack生产配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:20:19
 * @LastEditTime: 2022-07-19 16:23:18
 */

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const { analyzer } = process.env;

const plugins = [];

if (analyzer) {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerPort: 8888,
    })
  );
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
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 9,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|antd|axios|file-saver|jszip|moment|qiankun)[\\/]/,
          name: 'vendor',
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
