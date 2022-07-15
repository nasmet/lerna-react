/*
 * @Description: 字符串扩展方法
 * @Author: 吴锦辉
 * @Date: 2021-05-08 16:52:14
 * @LastEditTime: 2022-07-15 10:17:05
 */

/**
 * @description: 字符串转ascii码
 * @param {string} str
 * @return {number[]}
 */
export function strToAsc(str) {
  return str.split('').map(v => v.charCodeAt());
}

/**
 * @description: ascii码转字符串
 * @param {number[]} nums
 * @return {string}
 */
export function ascToStr(nums) {
  return nums.map(v => String.fromCharCode(v)).join('');
}

/**
 * @description: 字符串输入数字格式化
 * @param {string} str
 * @param {number} integerDigits 整数位位数
 * @param {number} decimalDigits 小数位位数
 * @return {string}
 */
export function formatStrToNum(str, integerDigits, decimalDigits) {
  let val = str;

  val = val
    .replace(/[^\d.]/g, '')
    .replace(/^0+/, '0')
    .replace(/^0(\d+)/, '$1')
    .replace(/\.+([^.]*)(\.*)/g, '.$1');

  if (integerDigits && integerDigits > 0) {
    const regex = new RegExp(`(\\d{${decimalDigits}})\\d+`);

    val = val.replace(regex, '$1');
  }

  if (decimalDigits && decimalDigits > 0) {
    const regex = new RegExp(`\\.(\\d{${decimalDigits}})(\\d*)`);

    val = val.replace(regex, '.$1');
  }

  return val;
}
