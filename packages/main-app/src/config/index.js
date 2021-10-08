/*
 * @Description: 配置文件
 * @Author: 吴锦辉
 * @Date: 2021-10-08 13:45:03
 * @LastEditTime: 2021-10-08 13:50:48
 */

// eslint-disable-next-line import/no-mutable-exports
let config;

switch (process.env.NODE_ENV) {
  case 'production':
    config = {
      ip: '120.78.195.150',
    };

    break;
  case 'development':
    config = {
      ip: 'localhost',
    };

    break;
  default:
    throw new Error('不存在该环境的运行');
}

export default config;
