/*
 * @Description: 路由跳转（主要处理登陆返回）
 * @Author: 吴锦辉
 * @Date: 2021-09-22 09:52:53
 * @LastEditTime: 2021-09-22 10:30:12
 */

export default class RouterJump {
  constructor(url) {
    this.defalutUrl = url;
    this.defalutJumpType = 'redirect';

    this.targetUrl = '';
    this.targetOptions = null;
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

  jumpAfterLogin() {
    const targetUrl = this.targetUrl || this.defalutUrl;
    const targetOptions = this.targetOptions || {};
    const jumpType = this.jumpType || this.defalutJumpType;

    console.log('targetUrl: ', targetUrl);

    switch (jumpType) {
      case 'redirect':
        window.history.replaceState(targetOptions, null, targetUrl);
        break;

      default:
        console.error('传入的跳转方式有误');
        break;
    }
  }
}
