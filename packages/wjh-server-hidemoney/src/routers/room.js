/*
 * @Description: 房间模块
 * @Author: 吴锦辉
 * @Date: 2021-09-28 15:38:25
 * @LastEditTime: 2021-09-28 17:20:43
 */

const express = require('express');
const { checkSessionHandle, responseHandle } = require('../middleware/index');
const mainCtrl = require('../controller/main');
const { codeMap } = require('../code/index');
const { generateSnowflakeId } = require('../utils/index');
const { verifyHideMoneyParams, verifyFindMoneyParams } = require('../param-verify/room');

const router = express.Router();

/** 藏钱 */
router.post(
  '/hidemoney',
  verifyHideMoneyParams(),
  checkSessionHandle,
  async (req, res, next) => {
    try {
      const roomCtrl = mainCtrl.getRoomCtrl();

      const roomId = generateSnowflakeId();

      req.body.userId = res.userId;

      req.body.id = roomId;

      await roomCtrl.createRoom(req.body);

      res.code = codeMap.Success;
      res.body = {
        roomId,
      };

      next();
    } catch (err) {
      next(err);
    }
  },
  responseHandle
);

/** 找钱 */
router.post(
  '/info',
  verifyFindMoneyParams(),
  checkSessionHandle,
  async (req, res, next) => {
    try {
      const roomCtrl = mainCtrl.getRoomCtrl();

      let values = await roomCtrl.selectRoom(req.body);

      values = JSON.parse(JSON.stringify(values));

      if (values.length === 0) {
        res.code = codeMap.RoomNotExist;

        next();

        return;
      }

      // eslint-disable-next-line prefer-destructuring
      values = values[0];

      res.code = codeMap.Success;
      res.body = values;

      next();
    } catch (err) {
      next(err);
    }
  },
  responseHandle
);

/** 找钱 */
router.post(
  '/findmoney',
  verifyHideMoneyParams(),
  checkSessionHandle,
  async (req, res, next) => {
    try {
      const roomCtrl = mainCtrl.getRoomCtrl();

      const roomId = generateSnowflakeId();

      req.body.userId = res.userId;

      req.body.id = roomId;

      await roomCtrl.createRoom(req.body);

      res.code = codeMap.Success;
      res.body = {
        roomId,
      };

      next();
    } catch (err) {
      next(err);
    }
  },
  responseHandle
);

module.exports = router;
