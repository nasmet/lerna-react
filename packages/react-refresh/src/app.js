/*
 * @Description: 应用文件
 * @Author: 吴锦辉
 * @Date: 2021-07-20 13:53:24
 * @LastEditTime: 2021-07-20 17:37:23
 */

import React, { useState, useCallback } from 'react';

function App() {
  const [count, setCount] = useState(1);

  const onAdd = useCallback(() => {
    setCount(count + 2);
  }, [count]);

  return (
    <>
      <button
        onClick={onAdd}
        style={{ width: '100px', height: '60px' }}
      ></button>
      <div>计数器：{count}</div>
    </>
  );
}

export default App;
