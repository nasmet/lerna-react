/*
 * @Description: 房间
 * @Author: 吴锦辉
 * @Date: 2021-09-30 13:40:58
 * @LastEditTime: 2021-10-01 16:41:19
 */

interface IHideRoomInfo {
  roomId?: string;
  itemId?: string;
  money?: string;
}

interface IFideRoomInfo {
  roomId?: string;
  itemId?: string;
  nickName?: string;
}

class RoomController {
  mode: any;
  hideRoomInfo: IHideRoomInfo;
  findRoomInfo: IFideRoomInfo;

  constructor() {
    this.mode = -1;
    this.hideRoomInfo = {};
    this.findRoomInfo = {};
  }

  setMode(value) {
    this.mode = value;
  }

  getMode() {
    return this.mode;
  }

  setHideRoomInfo(value) {
    this.hideRoomInfo = { ...this.hideRoomInfo, ...value };
  }

  getHideRoomInfo() {
    return this.hideRoomInfo;
  }

  setFindRoomInfo(value) {
    this.findRoomInfo = { ...this.findRoomInfo, ...value };
  }

  getFindRoomInfo() {
    return this.findRoomInfo;
  }

  resetHideRoomInfo() {
    this.hideRoomInfo = {};
  }
}

const roomCtrl = new RoomController();

export default roomCtrl;
