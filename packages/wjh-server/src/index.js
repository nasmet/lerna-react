/*
 * @Description: 服务启动入口
 * @Author: 吴锦辉
 * @Date: 2021-09-13 17:16:16
 * @LastEditTime: 2021-10-09 11:45:11
 */

const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routers/user');
const applicationRouter = require('./routers/application');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/user', userRouter);
app.use('/api/application', applicationRouter);

// eslint-disable-next-line no-unused-vars
app.use(function errorHandler(err, req, res, next) {
  res.status(500).json({
    code: -1,
    message: err.message,
  });
});

app.listen(process.env.PORT, () => {});
