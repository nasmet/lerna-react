/*
 * @Description: 应用文件
 * @Author: 吴锦辉
 * @Date: 2021-07-20 13:53:24
 * @LastEditTime: 2021-11-25 11:27:21
 */

import { useEffect } from 'react';
import { message } from 'antd';
import HttpUtils from 'wjh-request';

const httpUtils = new HttpUtils({ baseURL: 'https://www.ituring.com.cn' });

export default function WjhRequest() {
  useEffect(() => {
    const [tastId, execute] = httpUtils.get('/');
    execute
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        message.error(e.message);
        console.error(e);
      });
    return () => httpUtils.cancelRequestById(tastId);
  }, []);

  return null;
}
