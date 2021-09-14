/*
 * @Description: 用户相关接口请求
 * @Author: 吴锦辉
 * @Date: 2021-09-14 09:15:23
 * @LastEditTime: 2021-09-14 18:14:41
 */

const express = require('express');
const Snowflake = require('snowflake-id');
// const { checkSession } = require('../middleware/index');
const userController = require('../controller/user');
const sessionController = require('../controller/session');
const { codeMap, codeNameMap } = require('../error-code/index');

// eslint-disable-next-line new-cap
const snowflake = new Snowflake.default({
  mid: 42,
  offset: (2021 - 1970) * 31536000 * 1000,
});

const router = express.Router();

// router.use(checkSession);

router.post('/register', async (req, res) => {
  try {
    let values = await userController.selectAccount(req.body);

    if (values.length > 0) {
      res.status(200).json({
        code: codeMap.AccountExist,
        message: codeNameMap[codeMap.AccountExist],
      });

      return;
    }

    const id = snowflake.generate();
    const { account, password } = req.body;

    values = await userController.createUser({ id, account, password });

    res.status(200).json({
      code: codeMap.Success,
      message: codeNameMap[codeMap.Success],
    });
  } catch (err) {
    console.error(err);

    res.status(200).json({
      code: codeMap.Unknown,
      message: codeNameMap[codeMap.Unknown],
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    let values = await userController.selectUser(req.body);

    if (values.length > 0) {
      const { id } = values[0];

      const token = sessionController.generateSession(id);

      res.status(200).json({
        code: codeMap.Success,
        message: codeNameMap[codeMap.Success],
        data: {
          token,
        },
      });

      return;
    }

    values = await userController.selectAccount(req.body);

    let code = codeMap.AccountNotExist;

    if (values.length > 0) {
      code = codeMap.PasswordError;
    }

    res.status(200).json({
      code,
      message: codeNameMap[code],
    });
  } catch (err) {
    console.error('err: ', err);

    res.status(200).json({
      code: codeMap.Unknown,
      message: codeNameMap[codeMap.Unknown],
    });
  }
});

module.exports = router;
