/*
 * @Description: 用户模块
 * @Author: 吴锦辉
 * @Date: 2021-09-14 09:15:23
 * @LastEditTime: 2021-09-26 12:55:27
 */

const express = require('express');
const { checkSessionHandle, responseHandle } = require('../middleware/index');
const mainCtrl = require('../controller/main');
const { codeMap } = require('../code/index');
const { generateSnowflakeId } = require('../utils/index');
const {
  verifyLoginParams,
  verifyUserListParams,
  verifyUserDeleteParams,
} = require('../param-verify/user');

const router = express.Router();

/** 注册 */
router.post(
  '/register',
  verifyLoginParams(),
  async (req, res, next) => {
    /** 暂不支持接口注册 */
    if (true) {
      res.code = codeMap.NotSupported;

      next();

      return;
    }

    try {
      const userCtrl = mainCtrl.getUserCtrl();

      let values = await userCtrl.selectUser(req.body);

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
        const sessionId = generateSnowflakeId();

        await sessionCtrl.removeSessionByUseId(id);

        await sessionCtrl.createSession({
          id: sessionId,
          userId: id,
          token,
        });

        res.code = codeMap.Success;
        res.body = {
          token,
        };

        next();

        return;
      }

      values = await userCtrl.selectUser(req.body);

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

      await sessionCtrl.removeSession(res.token);

      res.code = codeMap.Success;

      next();
    } catch (err) {
      next(err);
    }
  },
  responseHandle
);

/** 查询用户列表 */
router.post(
  '/list',
  verifyUserListParams(),
  async (req, res, next) => {
    try {
      const userCtrl = mainCtrl.getUserCtrl();

      let values = await userCtrl.selectUserCount();

      values = JSON.parse(JSON.stringify(values));

      console.log('total: ', values);

      res.body = {
        total: values[0]['COUNT(*)'],
      };

      next();
    } catch (err) {
      next(err);
    }
  },
  async (req, res, next) => {
    try {
      const userCtrl = mainCtrl.getUserCtrl();

      let list = await userCtrl.selectUserByPage(req.body);

      list = JSON.parse(JSON.stringify(list));

      res.code = codeMap.Success;

      res.body.list = list;

      next();
    } catch (err) {
      next(err);
    }
  },
  responseHandle
);

/** 删除用户 */
router.post(
  '/delete',
  verifyUserDeleteParams(),
  async (req, res, next) => {
    try {
      const userCtrl = mainCtrl.getUserCtrl();

      const values = await userCtrl.selectUser(req.body);

      if (values.length > 0) {
        await userCtrl.deleteUser(req.body);
      }

      res.code = codeMap.Success;

      next();
    } catch (err) {
      next(err);
    }
  },
  responseHandle
);

module.exports = router;
