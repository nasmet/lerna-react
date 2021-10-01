/*
 * @Description: 用户模块
 * @Author: 吴锦辉
 * @Date: 2021-09-14 09:15:23
 * @LastEditTime: 2021-10-01 16:54:40
 */

const express = require('express');
const { responseHandle, checkSessionHandle, verifyAppid } = require('../middleware/index');
const mainCtrl = require('../controller/main');
const { codeMap } = require('../code/index');
const { generateSnowflakeId } = require('../utils/index');
const { verifyLoginParams, verifyUserListParams } = require('../param-verify/user');
const httpCtrl = require('../api');
const { appid, secret } = require('../config');

const router = express.Router();

/** 登录 */
router.post(
  '/login',
  verifyAppid,
  verifyLoginParams(),
  async (req, res, next) => {
    try {
      const { wxCode, avatarUrl, province, city, country, gender, language, nickName } = req.body;

      const [, execute] = httpCtrl.get('/sns/jscode2session', {
        appid,
        secret,
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
          nickName,
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
          nickName,
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

/** 查询用户列表 */
router.post(
  '/list',
  verifyAppid,
  verifyUserListParams(),
  checkSessionHandle,
  async (req, res, next) => {
    try {
      const userCtrl = mainCtrl.getUserCtrl();

      let list = await userCtrl.selectUserByPage(req.body);

      list = JSON.parse(JSON.stringify(list));

      res.code = codeMap.Success;

      res.body = list;

      next();
    } catch (err) {
      next(err);
    }
  },
  responseHandle
);

/** 用户可提现金额 */
router.post(
  '/withdrawable',
  verifyAppid,
  checkSessionHandle,
  async (req, res, next) => {
    try {
      const userCtrl = mainCtrl.getUserCtrl();

      let users = await userCtrl.selectUser({
        id: res.userId,
      });

      users = JSON.parse(JSON.stringify(users));

      if (users.length === 0) {
        res.code = codeMap.NotFound;

        next();

        return;
      }

      const { findMoney, withdrawnMoney, freezeMoney } = users[0];

      const withdrawable = Number(findMoney) - Number(withdrawnMoney) - Number(freezeMoney);

      res.code = codeMap.Success;

      res.body = {
        withdrawable,
      };

      next();
    } catch (err) {
      next(err);
    }
  },
  responseHandle
);

/** 用户提现 */
router.post(
  '/withdrawn',
  verifyAppid,
  checkSessionHandle,
  async (req, res, next) => {
    try {
      const userCtrl = mainCtrl.getUserCtrl();

      let users = await userCtrl.selectUser({
        id: res.userId,
      });

      users = JSON.parse(JSON.stringify(users));

      if (users.length === 0) {
        res.code = codeMap.NotExist;

        next();

        return;
      }

      const { findMoney, withdrawnMoney, freezeMoney } = users[0];

      const withdrawable = Number(findMoney) - Number(withdrawnMoney) - Number(freezeMoney);

      if (withdrawable <= 0) {
        res.code = codeMap.NoWithdrawal;

        next();

        return;
      }

      userCtrl.updateUser({
        id: res.userId,
        withdrawnMoney: Number(withdrawnMoney) + Number(withdrawable),
      });

      res.code = codeMap.Success;

      next();
    } catch (err) {
      next(err);
    }
  },
  responseHandle
);

module.exports = router;
