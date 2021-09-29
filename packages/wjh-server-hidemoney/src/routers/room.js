/*
 * @Description: 房间模块
 * @Author: 吴锦辉
 * @Date: 2021-09-28 15:38:25
 * @LastEditTime: 2021-09-29 16:25:59
 */

const express = require('express');
const { checkSessionHandle, responseHandle } = require('../middleware/index');
const mainCtrl = require('../controller/main');
const { codeMap } = require('../code/index');
const { generateSnowflakeId } = require('../utils/index');
const {
  verifyHideMoneyParams,
  verifyRoomInfoParams,
  verifyFindMoneyParams,
} = require('../param-verify/room');

const router = express.Router();

/** 藏钱 */
router.post(
  '/hidemoney',
  verifyHideMoneyParams(),
  checkSessionHandle,
  async (req, res, next) => {
    try {
      const roomCtrl = mainCtrl.getRoomCtrl();
      const userCtrl = mainCtrl.getUserCtrl();

      const roomId = generateSnowflakeId();

      req.body.userId = res.userId;

      req.body.id = roomId;

      await roomCtrl.createRoom(req.body);

      /** 后续换成微信支付，需要做调整 */
      let users = await userCtrl.selectUser({
        id: res.userId,
      });

      users = JSON.parse(JSON.stringify(users));

      const user = users[0];

      const money = Number(user.hideMoney) + Number(req.body.money);

      await userCtrl.updateUser({
        id: res.userId,
        hideMoney: money,
      });

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

/** 房间信息 */
router.post(
  '/info',
  verifyRoomInfoParams(),
  checkSessionHandle,
  async (req, res, next) => {
    try {
      const roomCtrl = mainCtrl.getRoomCtrl();
      const userCtrl = mainCtrl.getUserCtrl();

      let rooms = await roomCtrl.selectRoom(req.body);

      rooms = JSON.parse(JSON.stringify(rooms));

      if (rooms.length === 0) {
        res.code = codeMap.RoomNotExist;

        next();

        return;
      }

      const room = rooms[0];

      let users = await userCtrl.selectUser({
        id: room.userId,
      });

      users = JSON.parse(JSON.stringify(users));

      const user = users[0] || {};

      res.code = codeMap.Success;
      res.body = { ...room, nickName: user.name };

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
  verifyFindMoneyParams(),
  checkSessionHandle,
  async (req, res, next) => {
    try {
      const roomCtrl = mainCtrl.getRoomCtrl();
      const userCtrl = mainCtrl.getUserCtrl();

      const { roomId, itemId } = req.body;

      let rooms = await roomCtrl.selectRoom({
        id: roomId,
      });

      rooms = JSON.parse(JSON.stringify(rooms));

      if (rooms.length === 0) {
        res.code = codeMap.RoomNotExist;

        next();

        return;
      }

      const room = rooms[0];

      if (room.itemId !== itemId) {
        res.code = codeMap.NotFound;

        next();
      }

      if (room.status === 1) {
        res.code = codeMap.MoneyCollected;

        next();
      }

      await roomCtrl.updateRoom({
        id: roomId,
        status: 1,
        findUserId: res.userId,
      });

      let users = await userCtrl.selectUser({
        id: res.userId,
      });

      users = JSON.parse(JSON.stringify(users));

      const user = users[0];

      const money = Number(user.findMoney) + Number(room.money);

      await userCtrl.updateUser({
        id: res.userId,
        findMoney: money,
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
