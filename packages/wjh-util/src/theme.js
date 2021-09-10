/*
 * @Description: 动态设置css全局变量
 * @Author: 吴锦辉
 * @Date: 2021-09-10 09:27:28
 * @LastEditTime: 2021-09-10 09:33:40
 */

/**
 * @description: 改变主题色变量
 * @param {object} data
 * @return {void}
 */
export function changeTheme(data = {}) {
  if (!document) {
    throw new Error('只支持在浏览器环境下并且能操作document对象');
  }

  if (!data) {
    throw new Error('参数不能为空');
  }

  const root = document.querySelector(':root');

  Object.keys(data).forEach(key => {
    root.setAttribute('style', `--${key}: ${data[key]}`);
  });
}
