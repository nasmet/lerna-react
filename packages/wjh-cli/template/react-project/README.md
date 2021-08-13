## 简介

基于 webpack5 打包构建的 react 项目，集成 react 相关依赖

## 运行

npm i
npm run start

## 路由配置

路由使用的是集中是配置，在 src/routers.js 统一配置，支持嵌套路由，实现逻辑可以阅读 src/app.js 文件

## layout

存放的根组件，可以用于处理一些拦截操作

## pages

存放页面路由组件

## 注意事项

项目集成了 node-sass，由于 node-sass 不同版本对应不同 node 版本，当前项目的 node-sass 版本是 4.14.0 对应 Node14,如不是该 node 版本可能导致 node-sass 依赖会安装失败
