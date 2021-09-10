/*
 * @Description: 国际化方案
 * @Author: 吴锦辉
 * @Date: 2021-09-10 10:41:31
 * @LastEditTime: 2021-09-10 10:53:37
 */

/**
 * @description: 设置语言包
 * @param {string} key
 * @return {object}
 */
export default class I18 {
  constructor(configs) {
    this.languages = configs || {
      'zh-cn': {
        themeColorSwitch: '主题色切换',
        purpleTheme: '紫色主题',
        blueTheme: '蓝色主题',
      },
      en: {
        themeColorSwitch: 'Theme color switch',
        purpleTheme: 'Purple Theme',
        blueTheme: 'Blue Theme',
      },
    };
  }

  getLanguageByKey(key) {
    return this.languages[key] || {};
  }

  setLanguage(key, data) {
    this.languages[key] = data || {};
  }
}
