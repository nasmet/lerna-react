/*
 * @Description: 字符串扩展方法
 * @Author: 吴锦辉
 * @Date: 2021-05-08 16:52:14
 * @LastEditTime: 2022-07-14 10:36:18
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
 * @param {number} bit 小数点位数
 * @return {string}
 */
export function formatStrToNum(str, bit) {
  const regex = new RegExp(`\\.(\\d{${bit}})(\\d*)`);

  return str
    .replace(/[^\d.]/g, '')
    .replace(/^0+/g, '0')
    .replace(/^0(\d+)/g, '$1')
    .replace(/\.+([^.]*)(\.*)/g, '.$1')
    .replace(regex, '.$1');
}
