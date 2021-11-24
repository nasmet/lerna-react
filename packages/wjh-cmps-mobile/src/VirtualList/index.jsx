/*
 * @Description: 虚拟列表滚动组件，支持上拉和下拉加载
 * @Author: 吴锦辉
 * @Date: 2021-09-09 09:05:34
 * @LastEditTime: 2021-11-24 17:47:22
 */

import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';

import styles from './index.module.scss';

export default function VirtualList({
  renderCount = 10,
  wrapStyle = {},
  BodyCmp,
  renderItem,
  data = [],
  upDropEnd,
  downDropEnd,
}) {
  const [renderData, setRenderData] = useState(() => data.slice(0, renderCount));

  const start = useRef(0);
  const end = useRef(renderCount);
  const cacheData = useRef(data);

  const wrapNode = useRef(null);
  const contentNode = useRef(null);

  useEffect(() => {
    if (cacheData.length < data) {
      start.current = 0;
      end.current = 0;
      cacheData.current = data;

      setRenderData(data.slice(0, renderCount));
      wrapNode.current.scrollTop = 0;
    }
  }, [data, renderCount]);

  const onScroll = useCallback(
    e => {
      const { scrollTop, clientHeight } = e.target;

      if (scrollTop + clientHeight >= contentNode.current.clientHeight) {
        if (end.current >= cacheData.current.length) {
          downDropEnd && downDropEnd();

          return;
        }

        start.current += 1;
        end.current += 1;

        setRenderData(cacheData.current.slice(start.current, end.current));

        /** 这个高度的计算等于新加元素的高度 */
        const placeholderHeight = 50;

        wrapNode.current.scrollTop = scrollTop - placeholderHeight;
      } else if (scrollTop <= 0) {
        if (start.current <= 0) {
          upDropEnd && upDropEnd();

          return;
        }

        start.current -= 1;
        end.current -= 1;

        setRenderData(cacheData.current.slice(start.current, end.current));

        /** 这个高度的计算等于新加元素的高度 */
        const placeholderHeight = 50;

        wrapNode.current.scrollTop = scrollTop + placeholderHeight;
      }
    },
    [upDropEnd, downDropEnd]
  );

  const renderCmp = useMemo(() => {
    return renderData.map((v, index) => renderItem && renderItem(v, index));
  }, [renderData, renderItem]);

  return (
    <div className={styles.wrap} ref={wrapNode} style={wrapStyle} onScroll={onScroll}>
      <div className={styles.content} ref={contentNode}>
        {renderData.length > 0 ? BodyCmp ? <BodyCmp>{renderCmp}</BodyCmp> : renderCmp : null}
      </div>
    </div>
  );
}
