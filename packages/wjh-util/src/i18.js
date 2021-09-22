/*
 * @Description: 国际化方案
 * @Author: 吴锦辉
 * @Date: 2021-09-10 10:41:31
 * @LastEditTime: 2021-09-22 15:32:46
 */

/**
 * @description: 设置语言包
 * @param {string} key
 * @return {object}
 */
export default class I18 {
  constructor(configs) {
    this.languages = configs;
  }

  getLanguageByKey(key) {
    return this.languages[key] || {};
  }

  setLanguage(key, data) {
    const values = this.languages[key] || {};
    this.languages[key] = { ...values, ...data };
  }
}
