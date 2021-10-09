/*
 * @Description: 服务启动入口
 * @Author: 吴锦辉
 * @Date: 2021-09-13 17:16:16
 * @LastEditTime: 2021-10-09 14:41:51
 */

const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const winston = require('winston');
const expressWinston = require('express-winston');
const bodyParser = require('body-parser');
const userRouter = require('./routers/user');
const roomRouter = require('./routers/room');

const app = express();

app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true,
      }),
      // new winston.transports.File({
      //   filename: 'logs/success.json',
      // }),
    ],
  })
);

app.use('/api/user', userRouter);
app.use('/api/room', roomRouter);

app.use(
  expressWinston.errorLogger({
    transports: [
      new winston.transports.Console({
        json: true,
        colorize: true,
      }),
      // new winston.transports.File({
      //   filename: 'logs/error.json',
      // }),
    ],
  })
);

// eslint-disable-next-line no-unused-vars
app.use(function errorHandler(err, req, res, next) {
  res.status(500).json({
    code: -1,
    message: err.message,
  });
});

app.listen(process.env.PORT, () => {});
