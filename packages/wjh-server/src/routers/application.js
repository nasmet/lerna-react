/*
 * @Description: 应用管理模块
 * @Author: 吴锦辉
 * @Date: 2021-09-24 22:17:06
 * @LastEditTime: 2021-09-25 14:31:07
 */

const express = require('express');
const { checkSessionHandle, responseHandle } = require('../middleware/index');
const mainCtrl = require('../controller/main');
const { codeMap } = require('../code/index');
const { generateSnowflakeId } = require('../utils/index');
const {
  verifyApplicationListParams,
  verifyApplicationCreateParams,
  verifyApplicationDetailsParams,
  verifyApplicationUpdateParams,
} = require('../param-verify/application');

const router = express.Router();

router.use(checkSessionHandle);

/** 查询应用列表 */
router.post(
  '/list',
  verifyApplicationListParams(),
  async (req, res, next) => {
    try {
      const applicationCtrl = mainCtrl.getApplicationCtrl();

      let values = await applicationCtrl.selectApplicationCount();

      values = JSON.parse(JSON.stringify(values));

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
      const applicationCtrl = mainCtrl.getApplicationCtrl();

      let list = await applicationCtrl.selectApplicationByPage(req.body);

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

/** 创建应用 */
router.post(
  '/create',
  verifyApplicationCreateParams(),
  async (req, res, next) => {
    try {
      const id = generateSnowflakeId();

      req.body.id = id;

      const applicationCtrl = mainCtrl.getApplicationCtrl();

      await applicationCtrl.createApplication(req.body);

      res.code = codeMap.Success;
      res.body = {
        id,
      };

      next();
    } catch (err) {
      next(err);
    }
  },
  responseHandle
);

/** 应用详情 */
router.post(
  '/details',
  verifyApplicationDetailsParams(),
  async (req, res, next) => {
    try {
      const applicationCtrl = mainCtrl.getApplicationCtrl();

      let values = await applicationCtrl.selectApplication({ id: req.body.id });

      values = JSON.parse(JSON.stringify(values));

      if (values.length === 0) {
        res.code = codeMap.NotExist;

        next();

        return;
      }

      res.code = codeMap.Success;

      // eslint-disable-next-line prefer-destructuring
      res.body = values[0];

      next();
    } catch (err) {
      next(err);
    }
  },
  responseHandle
);

/** 更新应用 */
router.post(
  '/update',
  verifyApplicationUpdateParams(),
  async (req, res, next) => {
    try {
      const applicationCtrl = mainCtrl.getApplicationCtrl();

      let values = await applicationCtrl.selectApplication({ id: req.body.id });

      values = JSON.parse(JSON.stringify(values));

      if (values.length === 0) {
        res.code = codeMap.NotExist;

        next();

        return;
      }

      await applicationCtrl.updateApplication(req.body);

      res.code = codeMap.Success;

      next();
    } catch (err) {
      next(err);
    }
  },
  responseHandle
);

module.exports = router;
