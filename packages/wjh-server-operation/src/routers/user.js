/*
 * @Description: 用户相关接口请求
 * @Author: 吴锦辉
 * @Date: 2021-09-14 09:15:23
 * @LastEditTime: 2021-09-29 16:40:26
 */

const express = require('express');
const { checkSessionHandle, responseHandle } = require('../middleware/index');
const mainCtrl = require('../controller/main');
const { codeMap } = require('../code/index');
const { verifyUserListParams } = require('../param-verify/user');

const router = express.Router();

router.use(checkSessionHandle);

/** 查询用户列表 */
router.post(
  '/list',
  async (req, res, next) => {
    try {
      const userCtrl = mainCtrl.getUserCtrl();

      let values = await userCtrl.selectUserCount({
        appid: req.body.appid,
      });

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
  verifyUserListParams(),
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

module.exports = router;
