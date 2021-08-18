/*
 * @Description: InputNumber组件二次封装,保留两位小数，可通过更改正则修改小数点保留位数
 * @Author: 吴锦辉
 * @Date: 2021-08-11 10:39:28
 * @LastEditTime: 2021-08-18 09:12:44
 */

import React, { useCallback } from 'react';
import { InputNumber } from 'antd';

export default function NumberInput(props) {
  const formatter = useCallback(value => {
    if (/^[^\d]/.test(value)) {
      return '';
    }

    const reg = /^(-)*(\d+)\.(\d\d).*$/;

    if (typeof value === 'string') {
      return !isNaN(Number(value)) ? value.replace(reg, '$1$2.$3') : '';
    }

    if (typeof value === 'number') {
      return !isNaN(value) ? String(value).replace(reg, '$1$2.$3') : '';
    }

    return value.replace(/^(0[\d]+)/, '0');
  }, []);

  const parser = useCallback(value => {
    if (typeof value === 'string') {
      return Number(value);
    }

    return value;
  }, []);

  return <InputNumber formatter={formatter} parser={parser} {...props} />;
}
