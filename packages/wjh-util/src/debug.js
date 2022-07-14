/*
 * @Description: h5调试器
 * @Author: 吴锦辉
 * @Date: 2022-07-14 10:28:49
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-14 10:30:44
 */

export default function LoadVConsolePlugin() {
  if (!document) {
    throw new Error('不是浏览器环境下');
  }

  let script = document.createElement('script');

  script.src = 'https://cdn.bootcss.com/vConsole/3.3.4/vconsole.min.js';

  script.onload = () => {
    // eslint-disable-next-line no-new, no-undef
    new VConsole();
  };

  document.body.append(script);

  script = null;
}
