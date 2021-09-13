import React, { useEffect, useRef, useState } from 'react';

let history;
let routerCacheMap = {};

export default function KeepAlive(props) {
  const [active, SetActive] = useState(false);

  if (!history) {
    history = props.history;
  }

  if (!routerCacheMap[props.location.pathname]) {
    routerCacheMap[props.location.pathname] = SetActive;
  }

  if (active) {
    return <div style={{ display: `${props.match ? 'block' : 'none'}` }}>{props.children}</div>;
  }

  return props.match ? props.children : null;
}

export function useShow(fn, pathname) {
  const cb = useRef(fn);
  const listen = useRef(null);
  const path = useRef(pathname);

  useEffect(() => {
    if (history) {
      listen.current = history.listen(location => {
        if (location.pathname === path.current) {
          cb.current && cb.current();
        }
      });
    }

    return () => {
      listen.current && listen.current();
    };
  }, []);
}

export function useHide(fn, pathname) {
  const cb = useRef(fn);
  const listen = useRef(null);
  const path = useRef(pathname);
  const flag = useRef(false);

  useEffect(() => {
    if (history) {
      listen.current = history.listen(location => {
        if (location.pathname !== path.current) {
          if (flag.current) {
            return;
          }

          flag.current = true;
          cb.current && cb.current();
        } else {
          flag.current = false;
        }
      });
    }

    return () => {
      listen.current && listen.current();
    };
  }, []);
}

export function destory(path) {
  routerCacheMap[path] && routerCacheMap[path](false);
}

export function active(path) {
  routerCacheMap[path] && routerCacheMap[path](true);
}

export function destoryAll() {
  Object.keys(routerCacheMap).forEach(key => {
    routerCacheMap[key]();
  });

  routerCacheMap = {};
}
