/*
 * @Description: taro配置文件
 * @Author: 吴锦辉
 * @Date: 2021-09-23 14:10:40
 * @LastEditTime: 2021-09-26 14:00:15
 */

import path from 'path';

const config = {
  projectName: 'hide-money',
  date: '2021-09-24',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {},
  alias: {
    '@store': path.resolve(__dirname, '../src/store'),
    '@api': path.resolve(__dirname, '../src/api'),
    '@config': path.resolve(__dirname, '../src/config'),
  },
  copy: {
    patterns: [],
    options: {},
  },
  framework: 'react',
  mini: {
    // 忽略 Conflicting order between 警告, 本项目中主要使用 css module
    // https://github.com/NervJS/taro/issues/5460#issuecomment-629960591
    miniCssExtractPluginOption: {
      ignoreOrder: true,
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
      },
    },
  },
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};
