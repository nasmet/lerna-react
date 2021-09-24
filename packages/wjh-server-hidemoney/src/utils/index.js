/*
 * @Description: 工具方法
 * @Author: 吴锦辉
 * @Date: 2021-09-15 15:22:49
 * @LastEditTime: 2021-09-15 15:25:30
 */

const Snowflake = require('snowflake-id');

// eslint-disable-next-line new-cap
const snowflake = new Snowflake.default({
  mid: 42,
  offset: (2021 - 1970) * 31536000 * 1000,
});

function generateSnowflakeId() {
  return snowflake.generate();
}

module.exports = {
  generateSnowflakeId,
};
