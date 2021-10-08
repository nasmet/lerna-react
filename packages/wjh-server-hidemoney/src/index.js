/*
 * @Description: 服务启动入口
 * @Author: 吴锦辉
 * @Date: 2021-09-13 17:16:16
 * @LastEditTime: 2021-10-08 14:16:05
 */

const { argv } = require('yargs');

const { NODE_ENV } = argv;
process.env.NODE_ENV = NODE_ENV;

const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const userRouter = require('./routers/user');
const roomRouter = require('./routers/room');

const app = express();

app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/user', userRouter);
app.use('/api/room', roomRouter);

// eslint-disable-next-line no-unused-vars
app.use(function errorHandler(err, req, res, next) {
  res.status(500).json({
    code: -1,
    message: err.message,
  });
});

const port = 3002;

app.listen(port, () => {});
