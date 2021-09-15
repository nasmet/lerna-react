/*
 * @Description: 中间件
 * @Author: 吴锦辉
 * @Date: 2021-09-14 09:20:06
 * @LastEditTime: 2021-09-15 18:01:06
 */

const mainCtrl = require('../controller/main');
const { codeMap, codeNameMap } = require('../code/index');

function errorHandler(err, req, res) {
  console.log('err.message: 1234');

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
  const { authorization } = req.headers;

  try {
    // 获取token
    const token = authorization.replace('Bearer ', '');

    const sessionCtrl = mainCtrl.getSessionCtrl();

    if (!sessionCtrl.hasSession(token)) {
      next(new Error(codeMap.InvalidToken));
    } else {
      res.userId = sessionCtrl.getSession(token).userId;
      res.token = token;
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
