## 简介

基于 lerna 的多包管理项目

## 为什么使用 lerna

Lerna 通过管理诸如版本控制，代码部署，项目之间的依赖管理等任务，使开发人员更轻松。 它主要用于大型项目，随着时间的推移，手动执行所有这些任务变得很困难。

## 使用

模块安装
npm i

各个包模块模块依赖安装，相同模块提取到顶层，以软链形式存在
npm run init

前端项目命令交互运行
npm run start

后端项目 pm2 运行
npm run service

后端项目 pm2 停止
npm run stop

发布
npm run release

## lerna 注意事项（https://jishuin.proginn.com/p/763bfbd54caa）

1.lerna publish 永远不会发布 package.json 中 private 设置为 true 的包

2.发布自上次发布来有更新的包(这里的上次发布也是基于上次执行 lerna publish 而言)

3.发布在当前 commit 上打上了 annotated tag 的包(即 lerna publish from-git)

4.发布在最近 commit 中修改了 package.json 中的 version (且该 version 在 registry 中没有发布过)的包(即 lerna publish from-package)

## 遇到的问题

1.lerna 模块之间使用软链连接的，存在模块查找不到的问题，需要在 lerna.json 配置 bootstrap.hoist 为 true，将公共依赖提取到根目录，参考文章https://blog.csdn.net/i10630226/article/details/99702447
