/*
 * @Description: 用户相关接口请求
 * @Author: 吴锦辉
 * @Date: 2021-09-14 09:15:23
 * @LastEditTime: 2021-09-16 13:52:27
 */

const express = require('express');
const { checkSessionHandle, responseHandle } = require('../middleware/index');
const mainCtrl = require('../controller/main');
const { codeMap } = require('../code/index');
const { generateSnowflakeId } = require('../utils/index');
const { verifyLoginParams } = require('../param-verify/user');

const router = express.Router();

/** 注册 */
router.post(
  '/register',
  verifyLoginParams(),
  async (req, res, next) => {
    try {
      const userCtrl = mainCtrl.getUserCtrl();

      let values = await userCtrl.selectAccount(req.body);

      if (values.length > 0) {
        res.code = codeMap.AccountExist;

        next();

        return;
      }

      const id = generateSnowflakeId();

      const { account, password } = req.body;

      values = await userCtrl.createUser({ id, account, password });

      res.code = codeMap.Success;

      next();
    } catch (err) {
      next(err);
    }
  },
  responseHandle
);

/** 登录 */
router.post(
  '/login',
  verifyLoginParams(),
  async (req, res, next) => {
    try {
      const userCtrl = mainCtrl.getUserCtrl();

      const sessionCtrl = mainCtrl.getSessionCtrl();

      let values = await userCtrl.selectUser(req.body);

      if (values.length > 0) {
        const { id } = values[0];

        const token = sessionCtrl.generateSession(id);

        res.code = codeMap.Success;
        res.body = {
          token,
        };

        next();

        return;
      }

      values = await userCtrl.selectAccount(req.body);

      let code = codeMap.AccountNotExist;

      if (values.length > 0) {
        code = codeMap.PasswordError;
      }

      res.code = code;

      next();
    } catch (err) {
      next(err);
    }
  },
  responseHandle
);

router.use(checkSessionHandle);

/** 登出 */
router.post(
  '/loginout',
  async (req, res, next) => {
    try {
      const sessionCtrl = mainCtrl.getSessionCtrl();

      sessionCtrl.removeSession(res.token);

      res.code = codeMap.Success;

      next();
    } catch (err) {
      next(err);
    }
  },
  responseHandle
);
module.exports = router;
