/*
 * @Description: 国际化控制器
 * @Author: 吴锦辉
 * @Date: 2021-09-22 14:59:03
 * @LastEditTime: 2021-09-24 09:16:16
 */

import { I18 } from 'wjh-util';
import { store } from '@store';
import { setLanguage } from '@store/actions/i18';
import cacheCtrl from '@cache';
import languageConfig from './config';

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
