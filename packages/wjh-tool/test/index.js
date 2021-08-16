/*
 * @Description: 测试用例
 * @Author: 吴锦辉
 * @Date: 2021-05-08 16:56:24
 * @LastEditTime: 2021-05-10 10:16:16
 */

// const { ascToStr, strToAsc } = require('../utils/str');

// console.log(strToAsc('hello world'));
// console.log(ascToStr([104, 101, 108, 108, 111, 32, 119, 111, 114, 108, 100]));

// const { spliceUrlParams } = require('../utils/url');

// const params = { name: 'jack' };

// console.log(spliceUrlParams('http://w.m', params));
// console.log(spliceUrlParams('http://w.m?', params));
// console.log(spliceUrlParams('http://w.m?a=1', params));
// console.log(spliceUrlParams('http://w.m?a=1#123', params));
// console.log(spliceUrlParams('http://w.m?#123', params));

// const { addZero } = require('../utils/num');

// console.log(addZero('-1'));
// console.log(addZero('-1.1'));
// console.log(addZero('-11'));
// console.log(addZero('-11.1'));
// console.log(addZero('1'));
// console.log(addZero('1.1'));
// console.log(addZero('11'));
// console.log(addZero('11.1'));
// console.log(addZero('test'));
// console.log(addZero(-1));
// console.log(addZero(-1.1));
// console.log(addZero(-11));
// console.log(addZero(-11.1));
// console.log(addZero(1));
// console.log(addZero(1.1));
// console.log(addZero(11));
// console.log(addZero(11.1));

const { isFullUrl } = require('../utils/url');

console.log(isFullUrl('123'));
console.log(isFullUrl('http://a.e'));
console.log(isFullUrl('http://a.e.com'));
console.log(isFullUrl('https://a.e.com'));
console.log(isFullUrl('ftp://a.e.com'));
console.log(isFullUrl('rtsp://a.e.com'));
console.log(isFullUrl('mms://a.e.com'));
