/*
 * @Description: 中间件
 * @Author: 吴锦辉
 * @Date: 2021-09-14 09:20:06
 * @LastEditTime: 2021-09-14 18:13:25
 */

const sessionController = require('../controller/session');
const { codeMap, codeNameMap } = require('../error-code/index');

function errorHandler(err, req, res) {
  res.status(200).json({
    code: err.message,
    message: codeNameMap[err.message],
  });
}

function timeLog(req, res, next) {
  console.log('请求时间: ', Date.now());

  next();
}

function reqLog(req, res, next) {
  console.log('请求对象header: ', req.headers);
  console.log('请求对象body: ', req.body);

  next();
}

function serverHandle(req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  next();
}

function checkSession(req, res, next) {
  const authorization = req.headers['Authorization'];

  try {
    // 获取token
    const token = authorization.replace('Bearer ', '');

    if (!sessionController.hasSession(token)) {
      next(new Error(codeMap.InvalidToken));
    } else {
      req.userId = sessionController.getSession(token).userId;
    }

    next();
  } catch (err) {
    console.error('err: ', err);

    next(new Error(codeMap.Unknown));
  }
}

module.exports = {
  timeLog,
  reqLog,
  checkSession,
  errorHandler,
  serverHandle,
};
