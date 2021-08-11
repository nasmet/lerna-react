/*
 * @Description: 二维码生成器
 * @Author: 吴锦辉
 * @Date: 2021-05-19 10:13:08
 * @LastEditTime: 2021-08-11 11:28:50
 */

import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

export default function CreateQRCode({ link = 'http://www.baidu.com', width = 150, height = 150 }) {
  const qrcodeNode = useRef(null);

  useEffect(() => {
    if (!link) {
      return;
    }

    if (qrcodeNode.current) {
      QRCode.toCanvas(
        qrcodeNode.current,
        link,
        {
          width,
          height,
        },
        error => {
          if (error) {
            console.error('生成二维失败: ', error);
          }
        }
      );
    }
  }, [link, width, height]);

  if (!link) {
    return null;
  }

  return <canvas ref={qrcodeNode} />;
}
