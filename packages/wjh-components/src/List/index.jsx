import React, { useState, useCallback, useRef, useMemo } from 'react';
import classNames from 'classnames';
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

export default function List({
  wrapStyle = {},
  BodyCmp,
  renderItem,
  data = [],
  upDropEnd,
  downDropEnd,
}) {
  const [upDropStatus, setUpDropStatus] = useState(loadStatusMap.none);
  const [downDropStatus, setDownDropStatus] = useState(loadStatusMap.none);
  const [offsetY, setOffsetY] = useState(0);
  const [touchStatus, setTouchStatus] = useState(false);

  const contentNode = useRef(null);
  const touchRef = useRef({
    start: 0,
    end: 0,
    offset: 30,
    maxOffset: 60,
  });

  const onScroll = useCallback(
    e => {
      const { scrollTop, clientHeight } = e.target;

      if (scrollTop + clientHeight >= contentNode.current.clientHeight) {
        if (downDropStatus !== loadStatusMap.none && downDropStatus !== loadStatusMap.noMore) {
          return;
        }

        setDownDropStatus(loadStatusMap.downDropLoading);
        downDropEnd &&
          downDropEnd(
            () => setDownDropStatus(loadStatusMap.none),
            () => setDownDropStatus(loadStatusMap.noMore)
          );
      }
    },
    [downDropStatus, downDropEnd]
  );

  const onTouchStart = useCallback(
    e => {
      if (upDropStatus !== loadStatusMap.none) {
        return;
      }

      if (e.currentTarget.scrollTop > 0) {
        return;
      }

      setTouchStatus(true);

      touchRef.current.start = e.touches[0].clientY;
    },
    [upDropStatus]
  );

  const onTouchMove = useCallback(
    e => {
      if (!touchStatus) {
        return;
      }

      if (
        upDropStatus === loadStatusMap.upDropLoading ||
        upDropStatus === loadStatusMap.upDropEnd
      ) {
        return;
      }

      touchRef.current.end = e.touches[0].clientY;

      let offset = touchRef.current.end - touchRef.current.start;

      if (offset <= 0) {
        return;
      }

      offset = offset >= touchRef.current.maxOffset ? touchRef.current.maxOffset : offset;

      setOffsetY(offset);

      if (offset >= touchRef.current.offset) {
        setUpDropStatus(loadStatusMap.upDropStart);
      } else {
        setUpDropStatus(loadStatusMap.none);
      }
    },
    [upDropStatus, touchStatus]
  );

  const onTouchEnd = useCallback(() => {
    if (!touchStatus) {
      return;
    }

    setTouchStatus(false);

    const offset = touchRef.current.end - touchRef.current.start;

    if (offset >= touchRef.current.offset) {
      setUpDropStatus(loadStatusMap.upDropLoading);
      setOffsetY(0);

      upDropEnd && upDropEnd(() => setUpDropStatus(loadStatusMap.none));
    } else {
      setOffsetY(0);
      setUpDropStatus(loadStatusMap.none);
    }

    touchRef.current.start = 0;
    touchRef.current.end = 0;
  }, [touchStatus, upDropEnd]);

  const renderCmp = useMemo(() => {
    return data.map((v, index) => renderItem && renderItem(v, index));
  }, [data, renderItem]);

  return (
    <div
      className={styles.wrap}
      style={wrapStyle}
      onScroll={onScroll}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        className={classNames(styles.upDropTip, {
          [styles.active]:
            upDropStatus === loadStatusMap.upDropStart ||
            upDropStatus === loadStatusMap.upDropLoading ||
            upDropStatus === loadStatusMap.upDropEnd,
          [styles.hide]: upDropStatus === loadStatusMap.none,
        })}
      >
        {tipsMap[upDropStatus]}
      </div>
      <div
        className={styles.content}
        ref={contentNode}
        style={{
          transform: `translateY(${offsetY}px)`,
          transition: !touchStatus ? 'all 0.5s' : 'none',
        }}
      >
        {data.length > 0 ? BodyCmp ? <BodyCmp>{renderCmp}</BodyCmp> : renderCmp : null}
        {downDropStatus === loadStatusMap.noMore ||
        downDropStatus === loadStatusMap.downDropLoading ||
        downDropStatus === loadStatusMap.downDropEnd ? (
          <div className={styles.tip}>{tipsMap[downDropStatus]}</div>
        ) : null}

        {downDropStatus === loadStatusMap.none ? <div className={styles.tip}>暂无数据</div> : null}
      </div>
    </div>
  );
}

List.Pull = function Pull({ upDropEnd, children }) {
  const [upDropStatus, setUpDropStatus] = useState(loadStatusMap.none);
  const [offsetY, setOffsetY] = useState(0);
  const [touchStatus, setTouchStatus] = useState(false);

  const contentNode = useRef(null);
  const touchRef = useRef({
    start: 0,
    end: 0,
    offset: 30,
    maxOffset: 60,
  });

  const onTouchStart = useCallback(
    e => {
      if (upDropStatus !== loadStatusMap.none) {
        return;
      }

      if (e.currentTarget.scrollTop > 0) {
        return;
      }

      setTouchStatus(true);

      touchRef.current.start = e.touches[0].clientY;
    },
    [upDropStatus]
  );

  const onTouchMove = useCallback(
    e => {
      if (!touchStatus) {
        return;
      }

      if (
        upDropStatus === loadStatusMap.upDropLoading ||
        upDropStatus === loadStatusMap.upDropEnd
      ) {
        return;
      }

      touchRef.current.end = e.touches[0].clientY;

      let offset = touchRef.current.end - touchRef.current.start;

      if (offset <= 0) {
        return;
      }

      offset = offset >= touchRef.current.maxOffset ? touchRef.current.maxOffset : offset;

      setOffsetY(offset);

      if (offset >= touchRef.current.offset) {
        setUpDropStatus(loadStatusMap.upDropStart);
      } else {
        setUpDropStatus(loadStatusMap.none);
      }
    },
    [upDropStatus, touchStatus]
  );

  const onTouchEnd = useCallback(() => {
    if (!touchStatus) {
      return;
    }

    setTouchStatus(false);

    const offset = touchRef.current.end - touchRef.current.start;

    if (offset >= touchRef.current.offset) {
      setUpDropStatus(loadStatusMap.upDropLoading);
      setOffsetY(0);

      upDropEnd && upDropEnd(() => setUpDropStatus(loadStatusMap.none));
    } else {
      setOffsetY(0);
      setUpDropStatus(loadStatusMap.none);
    }

    touchRef.current.start = 0;
    touchRef.current.end = 0;
  }, [touchStatus, upDropEnd]);

  return (
    <div onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <div
        className={classNames(styles.upDropTip, {
          [styles.active]:
            upDropStatus === loadStatusMap.upDropStart ||
            upDropStatus === loadStatusMap.upDropLoading ||
            upDropStatus === loadStatusMap.upDropEnd,
          [styles.hide]: upDropStatus === loadStatusMap.none,
        })}
      >
        {tipsMap[upDropStatus]}
      </div>
      <div
        className={styles.content}
        ref={contentNode}
        style={{
          transform: `translateY(${offsetY}px)`,
          transition: !touchStatus ? 'all 0.5s' : 'none',
        }}
      >
        {children}
      </div>
    </div>
  );
};
