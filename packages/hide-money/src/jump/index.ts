/*
 * @Description: 路由跳转（主要处理登陆返回）
 * @Author: 吴锦辉
 * @Date: 2021-09-27 09:49:49
 * @LastEditTime: 2021-09-28 16:17:20
 */

import Taro from '@tarojs/taro';

class JumpController {
  targetUrl: any;
  defalutUrl: any;
  targetOptions: {};
  jumpType: any;
  defalutJumpType: any;
  constructor(url) {
    this.defalutUrl = url;
    this.defalutJumpType = 'redirect';

    this.targetUrl = '';
    this.targetOptions = {};
    /** redirect  */
    this.jumpType = '';
  }

  jumpBeforeLogin(options) {
    const { targetUrl, targetOptions, jumpType } = options || {};

    this.targetUrl = targetUrl;
    this.targetOptions = targetOptions;
    this.jumpType = jumpType;

    console.log('this.targetUrl: ', this.targetUrl);
  }

  spliceUrlParams(url, params) {
    let str = '';

    for (let [k, v] of Object.entries(params)) {
      if (typeof v === 'object') {
        v = JSON.stringify(v);
      }

      str += `${k}=${v}&`;
    }

    if (!str) {
      return url;
    }

    return `${url}?${encodeURIComponent(str)}`;
  }

  jumpAfterLogin() {
    const targetUrl = this.targetUrl || this.defalutUrl;
    const targetOptions = this.targetOptions || {};
    const jumpType = this.jumpType || this.defalutJumpType;

    console.log('targetUrl: ', targetUrl);

    switch (jumpType) {
      case 'redirect':
        Taro.redirectTo({
          url: this.spliceUrlParams(targetUrl, targetOptions),
        });

        break;

      default:
        console.error('传入的跳转方式有误');
        break;
    }
  }
}

export default new JumpController('/pages/main/index/index');
