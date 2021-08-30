/*
 * @Description: 日历(ios有兼容问题)
 * @Author: 吴锦辉
 * @Date: 2021-08-30 09:56:50
 * @LastEditTime: 2021-08-30 10:04:55
 */

import { useState, useCallback, useMemo } from 'react';
import moment from 'moment';

/**
 * @description: 整数小于10补0
 * @param {number}
 * @return {string}
 */
function addZero(number) {
  if (typeof number !== 'number') {
    throw new Error('传入的参数有误');
  }

  return number < 10 ? `0${number}` : number;
}

export default function useCalendar(unix = Date.now()) {
  const [time, setTime] = useState(unix);

  const calendar = useMemo(() => {
    const curDate = new Date(time);
    const curYear = curDate.getFullYear();
    const curMonth = curDate.getMonth() + 1;
    const curDay = curDate.getDate();
    let startTime;
    let endTime;
    let preYear;
    let preMonth;
    let nextYear;
    let nextMonth;

    /** 获取上一个月date */
    if (curMonth === 1) {
      preYear = curYear - 1;
      preMonth = 12;
    } else {
      preYear = curYear;
      preMonth = curMonth - 1;
    }

    /** 获取下一个月date */
    if (curMonth === 12) {
      nextYear = curYear + 1;
      nextMonth = 1;
    } else {
      nextYear = curYear;
      nextMonth = curMonth + 1;
    }

    const date = moment(`${curYear}-${addZero(curMonth)}-01`);
    const days = date.daysInMonth();
    let week = date.weekday();

    /** 星期日特殊处理下 */
    week = week === 0 ? 7 : week;
    /** 列数 */
    const column = 7;
    const before = week - 1;
    const preDate = moment(`${preYear}-${addZero(preMonth)}-1`);
    const preDays = preDate.daysInMonth();

    if (before <= 0) {
      startTime = `${curYear}-${addZero(curMonth)}-01`;
    } else {
      startTime = `${preYear}-${addZero(preMonth)}-${preDays - before}`;
    }

    /** 填充的天数 */
    const fillDays = days + before;
    /** 最后一行余留 */
    const remain = fillDays % column;
    const after = remain === 0 ? 0 : column - remain;

    if (after <= 0) {
      endTime = `${curYear}-${addZero(curMonth)}-${days}`;
    } else {
      endTime = `${nextYear}-${addZero(nextMonth)}-${addZero(after)}`;
    }

    return {
      startTime,
      endTime,
      before,
      after,
      curYear,
      curMonth,
      curDay,
      curDays: days,
      preYear,
      preMonth,
      preDays,
      nextYear,
      nextMonth,
    };
  }, [time]);

  const setCalendar = useCallback(unix => {
    setTime(unix);
  }, []);

  return [calendar, setCalendar];
}
