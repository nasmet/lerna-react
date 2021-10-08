/*
 * @Description: 配置文件
 * @Author: 吴锦辉
 * @Date: 2021-09-26 09:10:48
 * @LastEditTime: 2021-10-08 14:12:34
 */

const appid = 'wx3d9ec401e55391fa';
let host;

switch (process.env.NODE_ENV) {
  case 'development':
    host = 'http://0.0.0.0:3002';
    break;
  case 'production':
    host = 'http://120.78.195.150:3002';
    break;
  default:
    throw new Error('不存在该运行环境');
}

export default {
  appid,
  host,
};
