## 简介
基于axios二次封装的网络请求库

## 安装
npm i wjh-request -S

## 范例
```javascript
import HttpUtils from 'wjh-request';
import React, {useEffect} from 'react';

const httpUtils = new HttpUtils({ baseURL: 'https://www.ituring.com.cn',timeout: 10*1000,   requestIntercept =
      (configs => {
        configs.data = JSON.stringify(configs.data || {});
        configs.headers = {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        };

        configs.headers.Authorization = '';

        return configs;
      }),

    responseIntercept =
      (res => {
        switch (res.data.code) {
          case 200:
            return res.data.data;
          default:
            return Promise.reject(res.data.msg);
        }
      })});

function Layout(props) {
  useEffect(() => {
    const [tastId, execute] = httpUtils.get('/');

    execute
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.error(e);
      });

    return () => httpUtils.cancelRequestById(tastId);
  }, []);

  return (
    <div>
      httpUtils方法测试
    </div>
  );
}
```
