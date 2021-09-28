/*
 * @Description: 用户模块
 * @Author: 吴锦辉
 * @Date: 2021-09-14 09:15:23
 * @LastEditTime: 2021-09-28 15:42:46
 */

const express = require('express');
const { responseHandle } = require('../middleware/index');
const mainCtrl = require('../controller/main');
const { codeMap } = require('../code/index');
const { generateSnowflakeId } = require('../utils/index');
const { verifyLoginParams } = require('../param-verify/user');
const httpCtrl = require('../api');
const config = require('../config');

const router = express.Router();

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

      const { wxCode, avatarUrl, province, city, country, gender, language, nickName } = req.body;

      const [, execute] = httpCtrl.get('/sns/jscode2session', {
        appid: config.appid,
        secret: config.secret,
        js_code: wxCode,
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

        await userCtrl.updateUser({
          id,
          avatar: avatarUrl,
          province,
          city,
          country,
          gender,
          language,
          name: nickName,
        });
      } else {
        /** 创建用户 */
        const id = generateSnowflakeId();

        userId = id;

        await userCtrl.createUser({
          id,
          appid,
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

module.exports = router;
