/*
 * @Description: pm2配置文件
 * @Author:
 * @Date: 2021-10-09 11:00:04
 * @LastEditTime: 2021-10-09 11:45:53
 */

module.exports = {
  apps: [
    {
      name: 'main',
      script: './packages/wjh-server/src/index.js',
      watch: true,
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
