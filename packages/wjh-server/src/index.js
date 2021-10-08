/*
 * @Description: 服务启动入口
 * @Author: 吴锦辉
 * @Date: 2021-09-13 17:16:16
 * @LastEditTime: 2021-10-08 10:52:25
 */

const { argv } = require('yargs');

const { NODE_ENV } = argv;
process.env.NODE_ENV = NODE_ENV;

const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routers/user');
const applicationRouter = require('./routers/application');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function logHandler(req, res, next) {
  console.info('请求时间: ', new Date());
  console.info('请求body: ', req.body);

  next();
});

app.use('/api/user', userRouter);
app.use('/api/application', applicationRouter);

// eslint-disable-next-line no-unused-vars
app.use(function errorHandler(err, req, res, next) {
  console.error('errorHandler: ', err.message);

  res.status(500).send(err.message);
});

const port = 3000;

app.listen(port, () => {
  console.log(`express服务在端口：${port}监听`);
});
