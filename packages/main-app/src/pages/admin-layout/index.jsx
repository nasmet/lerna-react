import React from 'react';
import styles from './index.module.scss';

export default function AdminLayout(props) {
  return <div className={styles.wrap}>{props.children}</div>;
}
