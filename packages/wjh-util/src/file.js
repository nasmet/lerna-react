/*
 * @Description: 文件流操作相关
 * @Author: 吴锦辉
 * @Date: 2021-10-08 16:22:32
 * @LastEditTime: 2021-10-08 16:31:55
 */

/**
 * @description: a标签下载
 * @param {Buffer} buffer
 * @param {string} fileName
 * @return {void}
 */
export function download(buffer, fileName) {
  const a = document.createElement('a');
  const href = window.URL.createObjectURL(buffer);
  a.href = href;
  a.download = fileName;
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
export function base64UrlToFileObject(dataURL, fileName) {
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
export function readFile(blob) {
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
