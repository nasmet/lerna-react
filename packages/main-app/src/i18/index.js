/*
 * @Description: 国际化控制器
 * @Author: 吴锦辉
 * @Date: 2021-09-22 14:59:03
 * @LastEditTime: 2021-09-22 16:36:41
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
  },
  en: {
    globalization: 'globalization',
    themeColor: 'theme color',
    signOut: 'sign out',
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

  formatterMessage(key) {
    console.log('store: ', store.getState());
    return store.getState().i18[key];
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
}

const i18Ctrl = new I18Controller();

window.i18Ctrl = i18Ctrl;

export default i18Ctrl;
