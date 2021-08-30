/*
 * @Description: 人机交互hooks
 * @Author: 吴锦辉
 * @Date: 2021-08-30 10:06:32
 * @LastEditTime: 2021-08-30 10:09:12
 */

import { useState, useEffect, useCallback, useRef } from 'react';

export default function useFetchInteraction({ show, hide }) {
  /** 请求预留时间，单位毫秒 */
  const stayTime = 500;

  const [showLoading, setShowLoading] = useState(false);

  const timer = useRef(null);
  /** loading的标识，true表示已加载了loading */
  const flag = useRef(false);

  useEffect(() => {
    if (showLoading) {
      flag.current = true;

      show && show();

      return;
    }

    if (!showLoading && flag.current) {
      flag.current = false;

      hide && hide();
    }
  }, [showLoading, show, hide]);

  useEffect(() => {
    const value = timer;

    return () => {
      if (value.current) {
        clearTimeout(value.current);
      }
    };
  }, []);

  const fetchBefore = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      timer.current = null;
      setShowLoading(true);
    }, stayTime);
  }, []);

  const fetchAfter = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    } else {
      setShowLoading(false);
    }
  }, []);

  return [showLoading, fetchBefore, fetchAfter];
}
