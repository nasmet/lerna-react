/*
 * @Description: webpack配置文件
 * @Author: 吴锦辉
 * @Date: 2021-08-16 09:19:32
 * @LastEditTime: 2022-07-21 13:40:59
 */

const path = require('path');
const { argv } = require('yargs');
const { merge } = require('webpack-merge');

const { env } = argv;

const {
  setFreeVariable,
  setFontLoader,
  setImageLoader,
  setSassResourcesLoader,
  setSassLoader,
  setPostcssLoader,
  setCssLoader,
  setBabelLoader,
  setSassThreadLoader,
  setBabelThreadLoader,
  setContextReplacement,
  setHtmlWebpack,
  setPurgeCSS,
  setMiniCssExtract,
} = require('./webpack.part');

const baseConfig = {
  entry: './src/index.js',
  plugins: [
    setHtmlWebpack(),
    setMiniCssExtract(),
    setPurgeCSS(),
    setFreeVariable({
      __name__: 'wujinhui',
    }),
    /** 只加载zh-cn语言 */
    setContextReplacement(/moment[/\\]locale$/, /zh-cn/),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [setBabelThreadLoader(), setBabelLoader()],
      },
      {
        test: /\.css$/,
        use: [setMiniCssExtract.Instance.loader, setCssLoader(), setPostcssLoader()],
      },
      {
        test: /\.scss$/,
        use: [
          setMiniCssExtract.Instance.loader,
          setCssLoader(),
          setPostcssLoader(),
          setSassThreadLoader(),
          setSassLoader(),
          setSassResourcesLoader(['./src/global.scss']),
        ],
      },
      setImageLoader(15 * 1024),
      setFontLoader(),
    ],
  },
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@cache': path.resolve(__dirname, 'src/cache'),
      '@routerjump': path.resolve(__dirname, 'src/router-jump'),
      '@theme': path.resolve(__dirname, 'src/theme'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@i18': path.resolve(__dirname, 'src/i18'),
      '@config': path.resolve(__dirname, 'src/config'),
    },
    mainFiles: ['index.jsx', 'index.js'],
  },
};

let buildConfig;

switch (env) {
  case 'production':
    // eslint-disable-next-line global-require
    buildConfig = require('./webpack.prod');

    break;
  case 'development':
    // eslint-disable-next-line global-require
    buildConfig = require('./webpack.dev');

    break;
  default:
    throw new Error('不存在该环境的运行');
}

module.exports = merge(baseConfig, buildConfig);
