/*
 * @Description: 类型判断
 * @Author: 吴锦辉
 * @Date: 2021-09-16 10:25:15
 * @LastEditTime: 2021-09-16 10:50:46
 */
const types = {
  1: '[object Object]',
  2: '[object Number]',
  3: '[object String]',
  4: '[object Array]',
};

function TypeJudgment({ arg, type = 1 }) {
  return Reflect.toString.call(arg) === types[type];
}

function isObject(arg) {
  return TypeJudgment({
    arg,
  });
}

function isNumber(arg) {
  return TypeJudgment({
    arg,
    type: 2,
  });
}

function isString(arg) {
  return TypeJudgment({
    arg,
    type: 3,
  });
}

function isArray(arg) {
  return TypeJudgment({
    arg,
    type: 4,
  });
}

function isEmptyObject(arg) {
  return Object.keys(arg).length === 0;
}

module.exports = {
  isObject,
  isNumber,
  isString,
  isArray,
  isEmptyObject,
  TypeJudgment,
};
