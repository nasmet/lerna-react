/*
 * @Description: 拖拽类
 * @Author: 吴锦辉
 * @Date: 2021-10-15 15:45:14
 * @LastEditTime: 2021-10-19 09:32:49
 */

export default class ElementDrap {
  constructor(element) {
    /** 拖拽元素对象 */
    this.element = element;
    /** 开启拖拽相关值 */
    this.openDrag = false;
    this.timer = null;
    /** 单位毫秒 */
    this.delayTime = 300;

    /** 鼠标初始的x轴坐标 */
    this.mouseStartX = 0;
    /** 鼠标初始的y轴坐标 */
    this.mouseStartY = 0;
    /** 元素x轴偏移量 */
    this.offsetWrapX = 0;
    /** 元素y轴偏移量 */
    this.offsetWrapY = 0;
    /** 鼠标松开x轴偏移量 */
    this.mouseOffsetX = 0;
    /** 鼠标松开y轴偏移量 */
    this.mouseOffsetY = 0;

    /** 边界相关值 */
    this.borderLeft = 0;
    this.borderTop = 0;
    this.borderRight = 0;
    this.borderBottom = 0;

    /** 注册拖动事件 */
    this.onMouseMenuDown = this.onMouseMenuDown.bind(this);
    this.onMouseMenuUp = this.onMouseMenuUp.bind(this);
    this.onMouseMenuMove = this.onMouseMenuMove.bind(this);
    this.element.addEventListener('mousedown', this.onMouseMenuDown, false);
  }

  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  onMouseMenuDown(event) {
    window.addEventListener('mouseup', this.onMouseMenuUp, false);
    this.timer = setTimeout(() => {
      this.openDrag = true;
      const { x, y, offsetX, offsetY } = event;
      const { innerWidth, innerHeight } = window;
      const { offsetWidth, offsetHeight } = this.element;
      this.mouseStartX = x;
      this.mouseStartY = y;
      this.borderLeft = offsetX;
      this.borderTop = offsetY;
      this.borderRight = innerWidth - (offsetWidth - offsetX);
      this.borderBottom = innerHeight - (offsetHeight - offsetY);

      window.addEventListener('mousemove', this.onMouseMenuMove, false);
    }, this.delayTime);
  }

  onMouseMenuUp() {
    this.clearTimer();

    if (!this.openDrag) {
      return;
    }

    window.removeEventListener('mouseup', this.onMouseMenuUp);

    window.removeEventListener('mousemove', this.onMouseMenuMove);

    this.offsetWrapX += this.mouseOffsetX;
    this.offsetWrapY += this.mouseOffsetY;
    this.openDrag = false;
  }

  onMouseMenuMove(event) {
    if (!this.openDrag) {
      return;
    }
    let { x, y } = event;
    /** 边界处理 */
    if (x < this.borderLeft) {
      x = this.borderLeft;
    }
    if (x > this.borderRight) {
      x = this.borderRight;
    }
    if (y < this.borderTop) {
      y = this.borderTop;
    }
    if (y > this.borderBottom) {
      y = this.borderBottom;
    }
    this.mouseOffsetX = x - this.mouseStartX;
    this.mouseOffsetY = y - this.mouseStartY;
    this.element.style.transform = `translate(${this.offsetWrapX + this.mouseOffsetX}px, ${
      this.offsetWrapY + this.mouseOffsetY
    }px)`;
  }
}
