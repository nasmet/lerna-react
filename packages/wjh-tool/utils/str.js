/*
 * @Description: 字符串扩展方法
 * @Author: 吴锦辉
 * @Date: 2021-05-08 16:52:14
 * @LastEditTime: 2021-05-10 09:41:50
 */

/**
 * @description: 字符串转ascii码
 * @param {string} str
 * @return {number[]}
 */
function strToAsc(str) {
  return str.split('').map((v) => v.charCodeAt());
}

/**
 * @description: ascii码转字符串
 * @param {number[]}
 * @return {string}
 */
function ascToStr(nums) {
  return nums.map((v) => String.fromCharCode(v)).join('');
}

module.exports = {
  strToAsc,
  ascToStr,
};
