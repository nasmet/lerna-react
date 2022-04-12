/*
 * @Description: 入口文件
 * @Author: 吴锦辉
 * @Date: 2022-04-12 09:58:43
 * @LastEditTime: 2022-04-12 10:21:39
 */

const download = require('download');
const axios = require('axios');

const headers = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
};

function sleep(time) {
  return new Promise(reslove => setTimeout(reslove, time));
}
async function load(skip = 0) {
  const data = await axios
    .get(
      'http://service.picasso.adesk.com/v1/vertical/category/4e4d610cdf714d2966000000/vertical',
      {
        headers,
        params: {
          limit: 30, // 每页固定返回30条
          skip,
          first: 0,
          order: 'hot',
        },
      }
    )
    .then(res => {
      return res.data.res.vertical;
    })
    .catch(err => {
      console.log(err);
    });
  // eslint-disable-next-line no-use-before-define
  await downloadFile(data);
  await sleep(3000);
  if (skip < 1000) {
    load(skip + 30);
  } else {
    console.log('下载完成');
  }
}

async function downloadFile(data) {
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < data.length; index++) {
    const item = data[index];

    // Path at which image will get downloaded
    const filePath = '/Users/wujinhui/Downloads/壁纸';

    // eslint-disable-next-line no-await-in-loop
    await download(item.wp, filePath, {
      filename: `${item.id}.jpeg`,
      headers,
    }).then(() => {
      console.log(`Download ${item.id} Completed`);
    });
  }
}

load();
