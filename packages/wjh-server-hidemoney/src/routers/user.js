/*
 * @Description: 用户模块
 * @Author: 吴锦辉
 * @Date: 2021-09-14 09:15:23
 * @LastEditTime: 2021-09-26 17:26:47
 */

const express = require('express');
const { checkSessionHandle, responseHandle } = require('../middleware/index');
const mainCtrl = require('../controller/main');
const { codeMap } = require('../code/index');
const { generateSnowflakeId } = require('../utils/index');
const { verifyLoginParams } = require('../param-verify/user');
const httpCtrl = require('../api');
const config = require('../config');

const router = express.Router();

/** 注册 */
router.post(
  '/register',
  verifyLoginParams(),
  async (req, res, next) => {
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
    const { appid } = req.headers;

    try {
      if (appid !== config.appid) {
        res.code = codeMap.WrongAppid;

        next();

        return;
      }

      req.body.appid = appid;

      const [, execute] = httpCtrl.get('/sns/jscode2session', {
        appid: config.appid,
        secret: config.secret,
        js_code: req.body.wxCode,
        grant_type: 'authorization_code',
      });

      // eslint-disable-next-line camelcase
      const { session_key, openid, errcode, errmsg } = await execute;

      if (errcode) {
        res.code = errcode;
        res.message = errmsg;

        next();
        return;
      }

      const userCtrl = mainCtrl.getUserCtrl();

      const sessionCtrl = mainCtrl.getSessionCtrl();

      const values = await userCtrl.selectUser({
        openid,
      });

      let userId;

      if (values.length > 0) {
        const { id } = values[0];

        userId = id;

        await sessionCtrl.removeSessionByUseId(id);
      } else {
        /** 创建用户 */
        const id = generateSnowflakeId();

        userId = id;

        const { avatarUrl, province, city, country, gender, language, nickName } = req.body;

        await userCtrl.createUser({
          id,
          openid,
          avatar: avatarUrl,
          province,
          city,
          country,
          gender,
          language,
          name: nickName,
        });
      }

      const sessionId = generateSnowflakeId();

      await sessionCtrl.createSession({
        id: sessionId,
        userId,
        token: session_key,
      });

      res.code = codeMap.Success;
      res.body = {
        token: session_key,
      };

      next();
    } catch (err) {
      next(err);
    }
  },
  responseHandle
);

router.use(checkSessionHandle);

module.exports = router;
