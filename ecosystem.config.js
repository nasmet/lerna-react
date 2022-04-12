/*
 * @Description: pm2配置文件
 * @Author: 吴锦辉
 * @Date: 2021-10-09 11:00:04
 * @LastEditTime: 2022-04-12 10:15:48
 */

module.exports = {
  apps: [
    {
      name: 'main',
      script: './packages/wjh-server/src/index.js',
      watch: true,
      /** 应用启动模式，支持fork和cluster模式 */
      exec_mode: 'cluster',
      /** 应用启动实例个数，仅在cluster模式有效 */
      instances: 4,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        PORT: 3000,
        NODE_ENV: 'development',
      },
      env_production: {
        PORT: 3000,
        NODE_ENV: 'production',
      },
    },
    {
      name: 'operation',
      script: './packages/wjh-server-operation/src/index.js',
      watch: true,
      /** 应用启动模式，支持fork和cluster模式 */
      exec_mode: 'cluster',
      /** 应用启动实例个数，仅在cluster模式有效 */
      instances: 4,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        PORT: 3001,
        NODE_ENV: 'development',
      },
      env_production: {
        PORT: 3001,
        NODE_ENV: 'production',
      },
    },
    {
      name: 'hidemoney',
      script: './packages/wjh-server-hidemoney/src/index.js',
      watch: true,
      /** 应用启动模式，支持fork和cluster模式 */
      exec_mode: 'cluster',
      /** 应用启动实例个数，仅在cluster模式有效 */
      instances: 4,
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      env: {
        PORT: 3002,
        NODE_ENV: 'development',
      },
      env_production: {
        PORT: 3002,
        NODE_ENV: 'production',
      },
    },
  ],
};
