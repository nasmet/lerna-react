/*
 * @Description: 帧动画库
 * @Author: 吴锦辉
 * @Date: 2021-08-31 10:41:05
 * @LastEditTime: 2021-08-31 10:53:44
 */

/**
 * 创建动画函数
 * @param {function} timing   缓动函数
 * @param {function} draw     执行函数
 * @param {number}   duration 动画时间单位毫秒
 * @param {function} endCallback 完成的回调
 *
 * @return {object} executeAnimate:动画执行函数 cancelAnimate:动画取消函数
 */
// eslint-disable-next-line import/prefer-default-export
export function createAnimate({
  /** 动画函数，默认线性动画 */
  timing = timeFraction => timeFraction,
  draw,
  duration,
  endCallback,
}) {
  let timer = null;

  const executeAnimate = () => {
    const start = performance.now();

    timer = requestAnimationFrame(function animate(time) {
      // timeFraction 从 0 增加到 1
      let timeFraction = (time - start) / duration;

      if (timeFraction > 1) timeFraction = 1;

      // 计算当前动画状态
      const progress = timing(timeFraction);

      draw(progress); // 绘制

      if (timeFraction < 1) {
        timer = requestAnimationFrame(animate);
      } else {
        endCallback && endCallback();
      }
    });
  };

  const cancelAnimate = () => {
    if (timer) {
      cancelAnimationFrame(timer);
    }
  };

  return {
    executeAnimate,
    cancelAnimate,
  };
}
