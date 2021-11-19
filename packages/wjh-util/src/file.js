/*
 * @Description: 文件流操作相关
 * @Author: 吴锦辉
 * @Date: 2021-10-08 16:22:32
 * @LastEditTime: 2021-11-19 15:39:01
 */

import JsZip from 'jszip';
import FileSaver from 'file-saver';

/**
 * @description: a标签下载
 * @param {Blob} blob
 * @param {string} fileName
 * @return {void}
 */
export function download(blob, fileName) {
  const a = document.createElement('a');
  const href = window.URL.createObjectURL(blob);
  a.href = href;
  a.download = fileName || blob.name;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(href);
}

/**
 * base64格式url转成文件对象
 * @param  {string} dataURL base64格式url
 * @param  {string} fileName
 * @return {Blob}
 */
export function base64URLToBlob(dataURL, fileName) {
  const arr = dataURL.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  const u8arr = new Uint8Array(bstr.length);
  let n = bstr.length;

  // eslint-disable-next-line no-plusplus
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const blob = new Blob([u8arr], {
    type: mime,
  });
  const date = new Date();
  const unix = date.getTime();
  blob.lastModifiedDate = date;
  blob.lastModified = unix;
  const suffix = mime.split('/')[1];
  blob.name = `${fileName || unix}.${suffix}`;

  return blob;
}

/**
 * @description: 文件对象转成base64格式url
 * @param {Blob} blob
 * @return {Promise}
 */
export function blobToBase64URL(blob) {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = e => {
      reject(e);
    };
    reader.readAsDataURL(blob);
  });
}

/**
 * @description: 批量下载
 * @param {object[]} urls
 * @param {string} zipName
 * @return {Promise}
 */
export function batchDownload(urls, zipName) {
  return new Promise((resolve, reject) => {
    Promise.all(urls)
      .then(res => {
        const zip = new JsZip();
        const imgFolder = zip.folder(zipName);

        res.forEach(v => {
          imgFolder.file(`${v.name}.png`, v.url, {
            base64: true,
          });
        });

        zip
          .generateAsync({ type: 'blob' })
          .then(res => {
            FileSaver.saveAs(res, `${zipName}.zip`);
          })
          .finally(() => {
            resolve();
          });
      })
      .catch(err => {
        reject(err);
      });
  });
}

/**
 * @description: base64编码
 * @param {string} str
 * @return {string}
 */
export function encodeBase64(str) {
  return window.btoa(str);
}

/**
 * @description: base64解码
 * @param {string} str
 * @return {string}
 */
export function decodeBase64(str) {
  return window.atob(str);
}
