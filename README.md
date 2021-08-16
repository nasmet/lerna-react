## 简介

基于 lerna 的多包管理，类聚一些实用的功能，比如：根据模板快速创建项目、请求封装、根据配置渲染 react 路由、状态管理、工具包等

## 使用

运行在 node14 版本

npm install
npm run bootstrap
npm run start

## 注意

wjh-request、wjh-store、wjh-tool 已发布到 npm
wjh-cli 要通过命令使用，需要 npm link

## 遇到的问题

lerna 模块之间使用软链连接的，存在模块查找不到的问题，需要在 lerna.json 配置 bootstrap.hoist 为 true，将公共依赖提取到根目录，参考文章https://blog.csdn.net/i10630226/article/details/99702447
