/*
 * @Description: url扩展方法
 * @Author: 吴锦辉
 * @Date: 2021-05-08 16:24:06
 * @LastEditTime: 2021-10-18 10:51:32
 */

/**
 * @description: 拼接参数
 * @param {string} url
 * @param {object} params
 * @return {string}
 */
export function spliceUrlParams(url, params) {
  let str = '';

  for (const [k, v] of Object.entries(params)) {
    str += `${k}=${v}&`;
  }

  if (!str) {
    return url;
  }

  const index = url.indexOf('?');

  if (index === -1) {
    str = str.slice(0, str.length - 1);

    return `${url}?${str}`;
  }

  const len = url.length;
  const index1 = url.indexOf('#');

  if (index === len - 1 || index1 - 1 === index) {
    str = str.slice(0, str.length - 1);
  }

  return `${url.slice(0, index + 1)}${str}${url.slice(index + 1, len)}`;
}

/**
 * @description: 判断是不是https|http|ftp|rtsp|mms形式的地址
 * @param {string} url
 * @return {boolean}
 */
export function isFullUrl(url) {
  const str =
    '^((https|http|ftp|rtsp|mms)?://)' +
    // eslint-disable-next-line quotes
    "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + // ftp的user@
    '(([0-9]{1,3}.){3}[0-9]{1,3}' + // IP形式的URL- 199.194.52.184
    '|' + // 允许IP和DOMAIN（域名）
    // eslint-disable-next-line quotes
    "([0-9a-z_!~*'()-]+.)*" + // 域名- www.
    '([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].' + // 二级域名
    '[a-z]{2,6})' + // first level domain- .com or .museum
    '(:[0-9]{1,4})?' + // 端口- :80
    '((/?)|' + // a slash isn't required if there is no file name
    // eslint-disable-next-line quotes
    "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";

  const re = new RegExp(str);

  if (re.test(url)) {
    return true;
  }

  return false;
}
