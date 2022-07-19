import React from 'react';
import styles from './index.module.scss';
import 'antd/dist/antd.min.css';

export default function Layout(props) {
  return <div className={styles.wrap}>{props.children}</div>;
}
