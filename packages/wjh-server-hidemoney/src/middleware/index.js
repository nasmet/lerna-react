/*
 * @Description: 中间件
 * @Author: 吴锦辉
 * @Date: 2021-09-14 09:20:06
 * @LastEditTime: 2021-09-17 16:40:56
 */

const mainCtrl = require('../controller/main');
const { codeMap, codeNameMap } = require('../code/index');
const { TypeJudgment } = require('../utils/type');

function responseHandle(req, res) {
  res.setHeader('Content-Type', 'application/json');

  const { code, body } = res;

  res.status(200).json({
    code,
    message: codeNameMap[code],
    data: body,
  });
}

function checkSessionHandle(req, res, next) {
  const { authorization } = req.headers;

  try {
    // 获取token
    const token = authorization.replace('Bearer ', '');

    const sessionCtrl = mainCtrl.getSessionCtrl();

    if (!sessionCtrl.hasSession(token)) {
      const code = codeMap.InvalidToken;

      res.status(200).json({
        code,
        message: codeNameMap[code],
      });
    } else {
      res.userId = sessionCtrl.getSession(token).userId;
      res.token = token;

      next();
    }
  } catch (err) {
    next(err);
  }
}

function verifyParamsHandle(rules) {
  return (req, res, next) => {
    const body = req.body || {};

    const keys = Object.keys(rules);

    for (let i = 0, len = keys.length; i < len; i += 1) {
      const key = keys[i];

      const { required, type, max, min, regex } = rules[key];

      const value = body[key];

      if (required && value === undefined) {
        res.status(200).json({
          code: 7000,
          message: `参数${key} 是必传的`,
        });

        return;
      }

      if (value === undefined) {
        next();

        return;
      }

      if (type && !TypeJudgment({ arg: value, type })) {
        res.status(200).json({
          code: 7000,
          message: `参数${key} 类型有误`,
        });

        return;
      }

      if (min && value.length < min) {
        res.status(200).json({
          code: 7000,
          message: `参数${key} 最小长度${min}`,
        });

        return;
      }

      if (max && value.length > max) {
        res.status(200).json({
          code: 7000,
          message: `参数${key} 最大长度${max}`,
        });

        return;
      }

      if (regex && !regex.test(value)) {
        res.status(200).json({
          code: 7000,
          message: `参数${key} 格式有误`,
        });

        return;
      }
    }

    next();
  };
}

module.exports = {
  responseHandle,
  checkSessionHandle,
  verifyParamsHandle,
};
