/*
 * @Description: 字符串扩展方法
 * @Author: 吴锦辉
 * @Date: 2021-05-08 16:52:14
 * @LastEditTime: 2021-10-18 10:52:56
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
 * @param {number[]}
 * @return {string}
 */
export function ascToStr(nums) {
  return nums.map(v => String.fromCharCode(v)).join('');
}
