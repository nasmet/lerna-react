import React from 'react';
import i18Ctrl from '@i18';
import styles from './index.module.scss';

export default function Layout(props) {
  return <div className={styles.wrap}>{props.children}</div>;
}
