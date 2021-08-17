/*
 * @Description: 倒计时（单位秒）
 * @Author: 吴锦辉
 * @Date: 2020-08-24 15:42:19
 * @LastEditTime: 2021-08-17 09:30:16
 */
import React, { useEffect, useCallback, useRef } from 'react';

export default function useCountdown() {
  const timer = useRef(null);
  const endCallback = useRef(null);
  const executeCallback = useRef(null);

  const clearTimer = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current);

      timer.current = null;
    }
  }, []);

  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  const setEndCallback = useCallback(cb => {
    endCallback.current = cb;
  }, []);

  const setExecuteCallback = useCallback(cb => {
    executeCallback.current = cb;
  }, []);

  const countDown = useCallback(time => {
    if (time <= 0) {
      timer.current = null;

      endCallback.current && endCallback.current(time);

      return;
    }

    timer.current = setTimeout(() => {
      time -= 1;

      executeCallback.current && executeCallback.current(time);

      countDown(time);
    }, 1000);
  }, []);

  const startCounter = useCallback(
    time => {
      clearTimer();

      countDown(time);
    },
    [clearTimer, countDown]
  );

  return {
    startCounter,
    setExecuteCallback,
    setEndCallback,
    clearTimer,
  };
}
