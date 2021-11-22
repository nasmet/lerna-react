import React, { useCallback, useState } from 'react';
import * as wjhUtils from 'wjh-util';
import { Button } from 'antd';
import styles from './index.module.scss';

const i18 = new wjhUtils.I18({
  'zh-cn': {
    themeColorSwitch: '主题色切换',
    purpleTheme: '紫色主题',
    blueTheme: '蓝色主题',
  },
  en: {
    themeColorSwitch: 'theme color switch',
    purpleTheme: 'purple theme',
    blueTheme: 'blue theme',
  },
});

export default function WjhUtils() {
  const [lang, setLang] = useState(() => i18.getLanguageByKey('zh-cn'));

  const onSwitchTheme = useCallback(value => {
    wjhUtils.theme.changeTheme({
      primary: value,
    });
  }, []);

  const onSwitchLanguage = useCallback(value => {
    setLang(i18.getLanguageByKey(value));
  }, []);

  return (
    <div className={styles.wrap}>
      <div>{lang.themeColorSwitch}</div>
      <div style={{ marginTop: '0.4rem' }}>
        <Button
          style={{ marginRight: '0.4rem' }}
          onClick={() => {
            onSwitchTheme('#9932CD');
          }}
        >
          {lang.purpleTheme}
        </Button>
        <Button
          style={{ marginRight: '0.2rem' }}
          onClick={() => {
            onSwitchTheme('#0000FF');
          }}
        >
          {lang.blueTheme}
        </Button>
      </div>
      <div style={{ marginTop: '0.4rem' }}>
        <Button
          style={{ marginRight: '0.4rem' }}
          onClick={() => {
            onSwitchLanguage('zh-cn');
          }}
        >
          中文
        </Button>
        <Button
          style={{ marginRight: '0.2rem' }}
          onClick={() => {
            onSwitchLanguage('en');
          }}
        >
          英文
        </Button>
      </div>
    </div>
  );
}
