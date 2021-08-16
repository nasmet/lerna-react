/*
 * @Description: scss自动编译
 * @Author: 吴锦辉
 * @Date: 1985-10-26 16:15:00
 * @LastEditTime: 2021-08-16 13:40:26
 */
const { watch, src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');
const infoOperator = require('./info-operator');

const root = process.cwd();
let info = {};

function watchSass(root) {
  const watcher = watch(
    [`${root.replace(/\\/g, '/')}/**/*.scss`, `!${root.replace(/\\/g, '/')}/node_modules/**`],
    {
      // 返回 chokidar 的底层实例
      ignoreInitial: false, // 初次监听, false:执行 true:不执行
    }
  );
  watcher.on('change', path => {
    console.log(`File ${path} 编译成功`);
    const winRegex = /(.+\\)/g;
    const macRegex = /(.+\/)/g;
    let prePath = winRegex.exec(path);
    if (prePath) {
      prePath = prePath && prePath[0];
    } else {
      // eslint-disable-next-line prefer-destructuring
      prePath = macRegex.exec(path)[0];
    }
    src(path)
      .pipe(sass().on('error', sass.logError))
      .pipe(
        rename({
          extname: info.CSS,
        })
      )
      .pipe(dest(prePath));
  });
}

module.exports = () => {
  infoOperator.read().then(res => {
    info = res;
    watchSass(root);
  });
};
