/*
 * @Description: 服务启动入口
 * @Author: 吴锦辉
 * @Date: 2021-09-13 17:16:16
 * @LastEditTime: 2021-09-15 18:08:20
 */

const express = require('express');
const bodyParser = require('body-parser');
const { timeLog, reqLog, errorHandler, serverHandle } = require('./middleware/index');
const userRouter = require('./routers/user');

const app = express();
const port = 3000;

app.use(timeLog);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(reqLog);
app.use(serverHandle);

app.use('/user', userRouter);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`express服务在端口：${port}监听`);
});
