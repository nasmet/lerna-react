/*
 * @Description: 用户相关接口请求
 * @Author: 吴锦辉
 * @Date: 2021-09-14 09:15:23
 * @LastEditTime: 2021-09-15 15:26:57
 */

const express = require('express');
const { checkSession } = require('../middleware/index');
const mainCtrl = require('../controller/main');
const { codeMap, codeNameMap } = require('../code/index');
const { generateSnowflakeId } = require('../utils/index');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const userCtrl = mainCtrl.getUserCtrl();
    let values = await userCtrl.selectAccount(req.body);

    if (values.length > 0) {
      res.status(200).json({
        code: codeMap.AccountExist,
        message: codeNameMap[codeMap.AccountExist],
      });

      return;
    }

    const id = generateSnowflakeId();
    const { account, password } = req.body;

    values = await userCtrl.createUser({ id, account, password });

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
    const userCtrl = mainCtrl.getUserCtrl();
    const sessionCtrl = mainCtrl.getSessionCtrl();
    let values = await userCtrl.selectUser(req.body);

    if (values.length > 0) {
      const { id } = values[0];

      const token = sessionCtrl.generateSession(id);

      res.status(200).json({
        code: codeMap.Success,
        message: codeNameMap[codeMap.Success],
        data: {
          token,
        },
      });

      return;
    }

    values = await userCtrl.selectAccount(req.body);

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

router.use(checkSession);

router.post('/loginout', async (req, res) => {
  try {
    const sessionCtrl = mainCtrl.getSessionCtrl();

    sessionCtrl.removeSession(res.token);

    res.status(200).json({
      code: codeMap.Success,
      message: codeNameMap[codeMap.Success],
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
