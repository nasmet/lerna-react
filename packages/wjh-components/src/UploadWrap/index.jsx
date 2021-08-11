/*
 * @Description: 上传组件包装
 * @Author: 吴锦辉
 * @Date: 2021-08-11 10:59:28
 * @LastEditTime: 2021-08-11 10:59:59
 */

import React, { useRef, useCallback } from 'react';
import styles from './index.module.scss';

export default function UploadWrap({ children, accept = '*', onChange }) {
  const inputRef = useRef(null);

  const onOpen = useCallback(() => {
    inputRef.current.click();
  }, []);

  const onFileChange = e => {
    const file = e.target.files[0];
    inputRef.current.value = '';
    onChange && onChange(file);
  };

  return (
    <div className={styles.wrap} onClick={onOpen}>
      <input
        className={styles.input}
        type="file"
        accept={accept}
        ref={inputRef}
        onChange={onFileChange}
      />
      {children}
    </div>
  );
}
