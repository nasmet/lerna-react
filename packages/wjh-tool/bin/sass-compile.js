#! /usr/bin/env node

/*
 * @Description: scss编译
 * @Author: 吴锦辉
 * @Date: 1985-10-26 16:15:00
 * @LastEditTime: 2021-10-18 11:20:50
 */

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const rename = require('gulp-rename');

const root = process.cwd();

function watchSass(root) {
  const watcher = gulp.watch(
    [`${root.replace(/\\/g, '/')}/**/*.scss`, `!${root.replace(/\\/g, '/')}/node_modules/**`],
    {
      // 返回 chokidar 的底层实例
      ignoreInitial: false, // 初次监听, false:执行 true:不执行
    }
  );

  watcher.on('change', path => {
    gulp
      .src(path)
      .pipe(sass().on('error', sass.logError))
      .pipe(
        rename({
          extname: '.css',
        })
      )
      .pipe(gulp.dest('./'));
  });
}

watchSass(root);
