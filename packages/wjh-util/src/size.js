/*
 * @Description: 动态计算尺寸
 * @Author: 吴锦辉
 * @Date: 2021-08-25 17:45:18
 * @LastEditTime: 2021-08-25 17:56:43
 */

/**
 * 以下为设计稿要求：
 * 设计稿宽度：750px
 * css全部采用rem
 * html的font-size动态计算：设备宽度/7.5
 * 元素尺寸计算为：设计稿尺寸（px）/100 ，（注意单位为rem）
 * @description: 移动端html font-size动态计算设置
 * @param {*}
 * @return {*}
 */
export function adapteMobileFontSize(maxSize = 640, designSize = 750) {
  if (!document) {
    return;
  }

  const resizeBaseFontSize = () => {
    const rootHtml = document.documentElement;
    let deviceWidth = rootHtml.clientWidth;

    if (deviceWidth > maxSize) {
      deviceWidth = maxSize;
    }

    rootHtml.style.fontSize = `${deviceWidth / (designSize / 100)}px`;
  };

  resizeBaseFontSize();

  window.addEventListener('resize', resizeBaseFontSize, false);
  window.addEventListener('orientationchange', resizeBaseFontSize, false);
}

/**
 * 假设设计稿是750宽度
 * @description: px转vm
 * @param {*}
 * @return {*}
 */

export function pxToVm(p, designSize = 750) {
  return (p / designSize) * 100;
}

/**
 * 假设设计稿是750宽度
 * @description: rpx转px
 * @param {*}
 * @return {*}
 */
export function rpxToPx(p, designSize = 750) {
  if (!document) {
    throw new Error('不是浏览器环境下');
  }

  const realW = document.documentElement.clientWidth;

  return (realW / designSize) * p;
}
