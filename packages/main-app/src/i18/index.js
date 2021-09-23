/*
 * @Description: 国际化控制器
 * @Author: 吴锦辉
 * @Date: 2021-09-22 14:59:03
 * @LastEditTime: 2021-09-23 13:49:25
 */

import { I18 } from 'wjh-util';
import { store } from '@store';
import { setLanguage } from '@store/actions/i18';
import cacheCtrl from '@cache';

const languageConfig = {
  'zh-cn': {
    globalization: '国际化',
    themeColor: '主题色',
    signOut: '退出登录',
    tokenInvalid: '身份验证失败，请重新登录',
    account: '账号',
    password: '密码',
    login: '登录',
    register: '注册',
    accountTip: '温馨提示：数字和字母组成4到11位',
    passwordTip: '温馨提示：数字和字母组成6到16位',
    confirmPasswordAgain: '再次确认密码',
    passwordTip1: '两次输入的密码不一致',
    registerSuccess: '注册成功',
    return: '返回',
    signOutSuccess: '登出成功',
    default: '默认',
    orange: '橘黄色',
    comeFindMoney: '快来找钱吧',
    application: '应用',
    operationModule: '运营模块',
    userManagement: '用户管理',
  },
  en: {
    globalization: 'globalization',
    themeColor: 'theme color',
    signOut: 'sign out',
    tokenInvalid: 'authentication failed, please login again',
    account: 'account',
    password: 'password',
    login: 'login',
    register: 'register',
    accountTip: 'reminder: Numbers and letters form 4 to 11 digits',
    passwordTip: 'reminder: Numbers and letters form 6 to 16 digits',
    confirmPasswordAgain: 'confirm password again',
    passwordTip1: 'the two passwords entered are inconsistent',
    registerSuccess: 'registration success',
    return: 'return',
    signOutSuccess: 'sign out successfully',
    default: 'default',
    orange: 'orange',
    comeFindMoney: 'come find money',
    application: 'application',
    operationModule: 'operation module',
    userManagement: 'user Management',
  },
};

const i18 = new I18(languageConfig);

class I18Controller {
  constructor(language = 'zh-cn') {
    this.language = cacheCtrl.getLanguage() || language;
    this.i18 = i18;
  }

  initLanguage() {
    this.switchLanguage(this.language);
  }

  formatterMessage(key, prefix = '') {
    return store.getState().i18[prefix + key];
  }

  switchLanguage(key) {
    this.language = key;
    const language = this.i18.getLanguageByKey(key);

    store.dispatch(setLanguage(language));

    cacheCtrl.setLanguage(key);
  }

  getLanguage() {
    return this.i18.getLanguageByKey(this.language);
  }

  getI18() {
    return this.i18;
  }
}

const i18Ctrl = new I18Controller();

window.i18Ctrl = i18Ctrl;

export default i18Ctrl;
