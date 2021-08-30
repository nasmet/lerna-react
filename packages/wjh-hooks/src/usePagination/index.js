/*
 * @Description: 分页
 * @Author: 吴锦辉
 * @Date: 2021-08-30 09:59:21
 * @LastEditTime: 2021-08-30 09:59:21
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import useRefresh from './use-refresh';

export default function usePagination({
  /** 请求接口 */
  request,
  /** 请求参数 */
  args = {},
  /** 请求开始的操作 */
  fetchStart,
  /** 请求完成的操作 */
  fetchSuccess,
  /** 请求失败的操作 */
  fetchFail,
}) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [param, setParam] = useState(args);

  const fetchStartRef = useRef(fetchStart);
  const fetchSuccessRef = useRef(fetchSuccess);
  const fetchFailRef = useRef(fetchFail);
  /** 初始刷新不触发 */
  const initRefreshFlag = useRef(true);

  const [refresh, triggerRefresh] = useRefresh();

  useEffect(() => {
    if (!request) {
      return;
    }

    if (fetchStartRef.current && fetchStartRef.current()) {
      return;
    }

    setLoading(true);

    request(param)
      .then(res => {
        setResult(res.data);
        fetchSuccessRef.current && fetchSuccessRef.current();
      })
      .catch(e => {
        fetchFailRef.current && fetchFailRef.current(e?.message || '请求接口失败');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [param, request]);

  useEffect(() => {
    if (initRefreshFlag.current) {
      initRefreshFlag.current = false;

      return;
    }

    setParam(pre => ({ ...pre, page: 1 }));
  }, [refresh]);

  const getPrePage = useCallback(() => {
    setParam(pre => {
      const page = pre.page ? pre.page - 1 : 1;

      setParam({ ...pre, page });
    });
  }, []);

  const getNextPage = useCallback(() => {
    setParam(pre => {
      const page = pre.page ? pre.page + 1 : 1;

      setParam({ ...pre, page });
    });
  }, []);

  const updateFilterParam = useCallback((args, assign = true) => {
    setParam(pre => {
      if (assign) {
        return args ? { ...pre, ...args } : pre;
      }
      return args || pre;
    });
  }, []);

  return { result, loading, getPrePage, getNextPage, triggerRefresh, updateFilterParam };
}
