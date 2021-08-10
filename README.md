## 基于 lerna 的多包管理

## 项目初始化

npm install
npm run bootstrap

## 项目运行

npm run start

## 遇到的问题

lerna 模块之间使用软链连接的，存在模块查找不到的问题，需要在 lerna.json 配置 bootstrap.hoist 为 true，将公共依赖提取到根目录，参考文章https://blog.csdn.net/i10630226/article/details/99702447
