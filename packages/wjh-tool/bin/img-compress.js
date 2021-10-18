#!/usr/bin/env node

/*
 * @Description: 图片压缩脚本
 * @Author: 吴锦辉
 * @Date: 2021-04-22 17:31:34
 * @LastEditTime: 2021-10-18 10:27:31
 * reference: http://www.bubuko.com/infodetail-3616461.html
 */

const path = require('path');
const fs = require('fs');
const https = require('https');

/** 配置 */
const config = {
  IgnoreRegex: /(node_modules)$/,
  ImageRegex: /\.(png|jpg|jpeg)$/,
  OutputStyle: 'compressed', // nested，expanded，compact，compressed
};

/**
 * @description: 随机生成IP
 * @param {void}
 * @return {void}
 */
function randomGenerateIP() {
  return Array(4)
    .fill(1)
    .map(() => parseInt(Math.random() * 254 + 1, 10))
    .join('.');
}

/**
 * @description: TinyPng远程压缩HTTPS请求的配置生成方法
 * @param {void}
 * @return {object}
 */
function getAjaxOptions() {
  return {
    method: 'POST',
    hostname: 'tinypng.com',
    path: '/web/shrink',
    headers: {
      rejectUnauthorized: false,
      'X-Forwarded-For': randomGenerateIP(),
      'Postman-Token': Date.now(),
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
    },
  };
}

/**
 * @description: 文件下载
 * @param {string} entryImgPath 输出路径
 * @param {object} obj 文件数据
 * @return {void}
 */
function fileDownload(entryImgPath, obj) {
  const options = new URL(obj.output.url);

  const req = https.request(options, res => {
    let body = '';

    res.setEncoding('binary');

    res.on('data', data => {
      body += data;
    });

    res.on('end', () => {
      fs.writeFile(entryImgPath, body, 'binary', err => {
        if (err) {
          console.error(err);

          return;
        }

        console.log(`${entryImgPath}压缩成功`);
      });
    });
  });

  req.on('error', e => {
    console.error(e);
  });

  req.end();
}

/**
 * @description: 文件上传压缩
 * @param {string} imgPath 文件路径
 * @return {void}
 */
function fileUpload(imgPath) {
  const req = https.request(getAjaxOptions(), res => {
    res.on('data', buf => {
      const obj = JSON.parse(buf.toString());

      if (obj.error) {
        console.log(`压缩失败！\n 当前文件：${imgPath} \n ${obj.message}`);
      } else {
        fileDownload(imgPath, obj);
      }
    });
  });

  req.write(fs.readFileSync(imgPath), 'binary');

  req.on('error', e => {
    console.error(`请求错误! \n 当前文件：${imgPath} \n,`, e);
  });

  req.end();
}

/**
 * @description: 递归压缩
 * @param {string} root 文件路径
 * @return {void}
 */
function compressImage(root) {
  fs.stat(root, (err, stat) => {
    if (err) {
      console.error(err);
    } else if (stat.isFile() && config.ImageRegex.test(root)) {
      console.log(`${root}压缩中`);

      fileUpload(root);
    } else if (stat.isDirectory()) {
      if (config.IgnoreRegex.test(root)) {
        return;
      }

      fs.readdir(root, (err, files) => {
        if (err) {
          console.error(err);
        } else {
          files.forEach(file => {
            compressImage(path.join(root, file));
          });
        }
      });
    }
  });
}

compressImage(process.cwd());
