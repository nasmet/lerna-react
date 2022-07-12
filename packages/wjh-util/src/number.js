/*
 * @Description: 数字相关处理
 * @Author: 吴锦辉
 * @Date: 2021-09-09 16:35:40
 * @LastEditTime: 2022-07-12 17:03:50
 */

/**
 * @description: 浮点数相加
 * @param {number} a
 * @param {number} b
 * @return {*}
 */
export function add(num1, numb2) {
  /** 小数点的位数 */
  let aIndex = 0;
  let bIndex = 0;
  let a = num1;
  let b = numb2;

  if (!Number.isInteger(a)) {
    a += '';

    aIndex = a.length - a.indexOf('.') - 1;

    a = a.replace('.', '');
  }

  if (!Number.isInteger(b)) {
    b += '';

    bIndex = b.length - b.indexOf('.') - 1;

    b = b.replace('.', '');
  }

  const len = Math.max(aIndex, bIndex);

  if (len === 0) {
    return a + b;
  }

  a += new Array(len - aIndex + 1).join('0');

  b += new Array(len - bIndex + 1).join('0');

  // eslint-disable-next-line no-restricted-properties
  return (+a + +b) / Math.pow(10, len);
}

/**
 * @description: 数字小于10前缀补零
 * @param {number | string} number
 * @return {string}
 */
export function addZero(num) {
  let number = num;

  if (typeof number === 'string') {
    if (Number.isNaN(number)) {
      return number;
    }

    number = +number;
  }

  if (Number.isInteger(number) && number >= 0 && number < 10) {
    return `0${number}`;
  }

  return number;
}
