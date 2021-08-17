/*
 * @Description: 获取节点位置信息
 * @Author: 吴锦辉
 * @Date: 2020-09-07 15:10:13
 * @LastEditTime: 2021-08-17 09:33:59
 */

import React, { useState, useCallback } from 'react';

export default function useClientRect() {
  const [rect, setRect] = useState(null);

  const bindTarget = useCallback(node => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);

  return [rect, bindTarget];
}
