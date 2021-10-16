/*
 * @Description: 错误日志上报
 * @Author: 吴锦辉
 * @Date: 2021-08-26 09:23:59
 * @LastEditTime: 2021-10-16 13:04:54
 */

/**
 * @description: 上报错误日志
 * @param {*}
 * @return {*}
 */
export function reportErrorLog() {
  window.addEventListener(
    'error',
    e => {
      e.stopImmediatePropagation();

      const { srcElement } = e;

      /* script标签加载失败 */
      if (
        srcElement &&
        srcElement.tagName &&
        srcElement.tagName.toLocaleLowerCase() === 'script' &&
        srcElement.src.indexOf('umi') !== -1
      ) {
        console.error('script资源文件加载失败: ', srcElement.src);

        return;
      }

      /* 全局错误 */
      if (srcElement === window) {
        console.error('全局错误: ', e.message);
      }
    },
    true
  );
}
