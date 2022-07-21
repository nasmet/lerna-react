/*
 * @Description: webpack配置方法提取
 * @Author: 吴锦辉
 * @Date: 2022-07-20 15:49:03
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-21 11:21:14
 */

const path = require('path');
const threadLoader = require('thread-loader');
const autoprefixer = require('autoprefixer');
const { DefinePlugin, ContextReplacementPlugin } = require('webpack');
const UnusedWebpackPlugin = require('unused-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
const PurgeCSSPlugin = require('purgecss-webpack-plugin');

const loaderPoolOptions = {
  // 池选项，例如传递给 loader 选项
  // 必须匹配 loader 选项才能启动正确的池

  // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)，或者，
  // 在 require('os').cpus() 是 undefined 时回退至 1
  workers: 2,

  // 一个 worker 进程中并行执行工作的数量
  // 默认为 20
  workerParallelJobs: 50,

  // 额外的 node.js 参数
  workerNodeArgs: ['--max-old-space-size=1024'],

  // 允许重新生成一个僵死的 work 池
  // 这个过程会降低整体编译速度
  // 并且开发环境应该设置为 false
  poolRespawn: false,

  // 闲置时定时删除 worker 进程
  // 默认为 500（ms）
  // 可以设置为无穷大，这样在监视模式(--watch)下可以保持 worker 持续存在
  poolTimeout: 2000,

  // 池分配给 worker 的工作数量
  // 默认为 200
  // 降低这个数值会降低总体的效率，但是会提升工作分布更均一
  poolParallelJobs: 50,

  // 池的名称
  // 可以修改名称来创建其余选项都一样的池
  name: 'loader-pool',
};

threadLoader.warmup(loaderPoolOptions, ['babel-loader']);

const setBabelThreadLoader = () => {
  return {
    loader: 'thread-loader',
    options: loaderPoolOptions,
  };
};

/* node-sass 中有个来自 Node.js 线程池的阻塞线程的 bug。
  当使用 thread-loader 时，需要设置 workerParallelJobs: 2 */
const sassLoaderPoolOptions = {
  ...loaderPoolOptions,
  workerParallelJobs: 2,
};

threadLoader.warmup(sassLoaderPoolOptions, ['sass-loader']);

const setSassThreadLoader = () => {
  return {
    loader: 'thread-loader',
    options: sassLoaderPoolOptions,
  };
};

const setBabelLoader = () => {
  return {
    loader: 'babel-loader',
    options: {
      presets: [
        [
          '@babel/preset-env',
          {
            useBuiltIns: 'entry',
            corejs: '3.22',
          },
        ],
        '@babel/preset-react',
      ],
    },
  };
};

const setCssLoader = (options = {}) => {
  return {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      ...options,
    },
  };
};

const setPostcssLoader = () => {
  return {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [autoprefixer()],
      },
    },
  };
};

const setSassLoader = (options = {}) => {
  return {
    loader: 'sass-loader',
    options: {
      ...options,
    },
  };
};

const setSassResourcesLoader = (files = []) => {
  return {
    loader: 'sass-resources-loader',
    options: {
      sourceMap: true,
      resources: files.map(v => path.resolve(__dirname, v)),
    },
  };
};

const setImageLoader = (limit = 20 * 1024) => ({
  test: /\.(png|svg|jpg|jpeg|gif)$/,
  type: 'asset',
  parser: { dataUrlCondition: { maxSize: limit } },
});

const setFontLoader = (options = {}) => {
  return {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: 'asset/resource',
    ...options,
  };
};

/** 注入变量 */
const setFreeVariable = (obj = {}) => {
  const env = {};

  Object.keys(obj).forEach(key => {
    env[key] = JSON.stringify(obj[key]);
  });

  return new DefinePlugin(env);
};

const setContextReplacement = (
  resourceRegExp,
  newContentResource,
  newContentRecursive,
  newContentRegExp
) => {
  return new ContextReplacementPlugin(
    resourceRegExp,
    newContentResource,
    newContentRecursive,
    newContentRegExp
  );
};

const setUnusedWebpack = () => {
  return new UnusedWebpackPlugin({
    // Source directories
    directories: [path.join(__dirname, 'src')],
    // Exclude patterns
    exclude: ['*.test.js'],
    // Root directory (optional)
    root: __dirname,
  });
};

const setBundleAnalyzer = (analyzerPort = 8888) => {
  return new BundleAnalyzerPlugin({
    analyzerPort,
  });
};

const setChunkName = (module, chunks, cacheGroupKey) => {
  const moduleFileName = module
    .identifier()
    .split('/')
    .reduceRight(item => item);
  const allChunksNames = chunks.map(item => item.name).join('~');
  return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
};

const setHtmlWebpack = (template = './public/index.html') => {
  return new HtmlWebpackPlugin({
    template,
  });
};

const setPurgeCSS = (options = { only: ['styles'] }) => {
  return new PurgeCSSPlugin({
    // 这里只针对名称为styles的chunk, 主要移除antd的没有用到的样式
    paths: glob.sync(path.join(__dirname, 'src/**/*'), { nodir: true }),
    ...options,
  });
};

const setMiniCssExtract = (filename = '[name].[contenthash].css') => {
  return new MiniCssExtractPlugin({
    filename,
  });
};

setMiniCssExtract.Instance = MiniCssExtractPlugin;

module.exports = {
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
  setUnusedWebpack,
  setBundleAnalyzer,
  setChunkName,
  setHtmlWebpack,
  setPurgeCSS,
  setMiniCssExtract,
};
