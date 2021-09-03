import React, { useState, useCallback, useRef, useEffect } from 'react';
import styles from './index.module.scss';

/** 加载状态映射 */
export const loadStatusMap = {
  none: 0,

  /** 上拉相关 */
  upDropStart: 1,
  upDropLoading: 2,
  upDropEnd: 3,

  /** 下拉相关 */
  downDropLoading: 4,
  downDropEnd: 5,
  noMore: 6,
};

/** 提示语映射 */
export const tipsMap = {
  [loadStatusMap.upDropStart]: '松开手指刷新',
  [loadStatusMap.upDropLoading]: '数据加载中....',
  [loadStatusMap.upDropEnd]: '数据加载完成',
  [loadStatusMap.downDropLoading]: '数据加载中....',
  [loadStatusMap.downDropEnd]: '数据加载完成',
  [loadStatusMap.noMore]: '没有更多啦～',
};

export default function List() {
  const [status, setStatus] = useState(loadStatusMap.none);
  const [data, setData] = useState([]);
  const [offsetY, setOffsetY] = useState(0);
  const [touchStatus, setTouchStatus] = useState(false);

  const contentNode = useRef(null);
  const touchRef = useRef({
    start: 0,
    end: 0,
    offset: 30,
    maxOffset: 60,
  });

  useEffect(() => {
    setData(new Array(10).fill(1));
  }, []);

  const onScroll = useCallback(e => {
    const { scrollTop, clientHeight } = e.target;

    if (scrollTop + clientHeight >= contentNode.current.clientHeight) {
      setStatus(loadStatusMap.noMore);
    }
  }, []);

  const onTouchStart = useCallback(
    e => {
      if (status !== loadStatusMap.none) {
        return;
      }

      setTouchStatus(true);

      touchRef.current.start = e.touches[0].clientY;
    },
    [status]
  );

  const onTouchMove = useCallback(
    e => {
      if (status === loadStatusMap.upDropLoading || status === loadStatusMap.upDropEnd) {
        return;
      }

      touchRef.current.end = e.touches[0].clientY;

      let offset = touchRef.current.end - touchRef.current.start;
      offset = offset >= touchRef.current.maxOffset ? touchRef.current.maxOffset : offset;

      setOffsetY(offset);

      if (offset >= touchRef.current.offset) {
        setStatus(loadStatusMap.upDropStart);
      } else {
        setStatus(loadStatusMap.none);
      }
    },
    [status]
  );

  const onTouchEnd = useCallback(() => {
    setTouchStatus(false);

    const offset = touchRef.current.end - touchRef.current.start;

    if (offset >= touchRef.current.offset) {
      setStatus(loadStatusMap.upDropLoading);
      setOffsetY(touchRef.current.offset);

      setTimeout(() => {
        setStatus(loadStatusMap.upDropEnd);

        setTimeout(() => {
          setOffsetY(0);
          setStatus(loadStatusMap.none);
        }, 2000);
      }, 2000);
    } else {
      setOffsetY(0);
      setStatus(loadStatusMap.none);
    }

    touchRef.current.start = 0;
    touchRef.current.end = 0;
  }, []);

  return (
    <div
      className={styles.wrap}
      onScroll={onScroll}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {status === loadStatusMap.upDropStart ||
      status === loadStatusMap.upDropLoading ||
      status === loadStatusMap.upDropEnd ? (
        <div>{tipsMap[status]}</div>
      ) : null}
      <div
        className={styles.content}
        ref={contentNode}
        style={{
          transform: `translateY(${offsetY}px)`,
          transition: !touchStatus ? 'all 0.5s' : 'none',
        }}
      >
        {data.map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className={styles.item}>
            {index}
          </div>
        ))}
        {status === loadStatusMap.noMore ? <div>{tipsMap[status]}</div> : null}
      </div>
    </div>
  );
}
