import React from 'react';
import styles from './index.module.scss';

export default function Layout(props) {
  return <div className={styles.wrap}>{props.children}</div>;
}
