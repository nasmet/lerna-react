import React from 'react';
import { ErrorBoundary } from 'wjh-components';
import styles from './index.module.scss';

export default function Layout(props) {
  return (
    <ErrorBoundary>
      <div className={styles.wrap}>{props.children}</div>
    </ErrorBoundary>
  );
}
