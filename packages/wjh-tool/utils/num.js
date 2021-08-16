/*
 * @Description: 数字扩展方法
 * @Author: 吴锦辉
 * @Date: 2021-05-10 09:41:58
 * @LastEditTime: 2021-05-10 09:57:18
 */

/**
 * @description: 数字小于10前缀补零
 * @param {number | string} number
 * @return {string}
 */
function addZero(number) {
  if (typeof number === 'string') {
    if (isNaN(number)) {
      return number;
    }

    number = +number;
  }

  if (Number.isInteger(number) && number >= 0 && number < 10) {
    return `0${number}`;
  }

  return number;
}

module.exports = {
  addZero,
};
