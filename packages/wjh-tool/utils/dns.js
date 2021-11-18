/*
 * @Description:
 * @Author:
 * @Date: 2021-11-09 16:36:48
 * @LastEditTime: 2021-11-09 16:36:49
 */
const dns = require('dns');

dns.lookup('www.baidu.com', (err, address, family) => {
  console.log('address: %j family: IPv%s', address, family);
});
