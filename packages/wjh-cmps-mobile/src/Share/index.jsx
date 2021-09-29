import React, { useState, useEffect, useCallback, useMemo } from 'react';
import wx from 'weixin-js-sdk';
import styles from './index.module.scss';
import icon3 from './img/icon-3.svg';
import icon4 from './img/icon-4.svg';
import icon5 from './img/icon-5.svg';

function getUserAgent() {
  const u = navigator.userAgent.toLowerCase();
  const app = navigator.appVersion;
  const android = u.includes('android');
  const ios = /iphone|ipod|ipad/i.test(u);

  return {
    android,
    ios,
    mobile: /mobi|miui/.test(u),
    // mac: u.includes('macintosh'),
    // win: u.includes('windows'),
    weixin: u.includes('micromessenger'),
    qq: u.includes(' qq'),
    href: window.location.href,
    app,
  };
}

export default function Share(props) {
  const [showGuide, setShowGuide] = useState(false);
  const userAgent = useMemo(() => getUserAgent(), []);

  useEffect(() => {
    const {
      appId,
      timestamp,
      nonceStr,
      signature,
      shareTitle,
      shareDesc,
      shareLink,
      shareImgUrl,
      fail,
    } = props;

    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId, // 必填，公众号的唯一标识
      timestamp, // 必填，生成签名的时间戳
      nonceStr, // 必填，生成签名的随机串
      signature, // 必填，签名
      jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'], // 必填，需要使用的JS接口列表
    });

    wx.ready(() => {
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
      // config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
      // 则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，
      // 则可以直接调用，不需要放在ready函数中。
      wx.updateAppMessageShareData({
        title: shareTitle, // 分享标题
        desc: shareDesc, // 分享描述
        link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareImgUrl, // 分享图标
      });

      wx.updateTimelineShareData({
        title: shareTitle, // 分享标题
        link: shareLink, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        imgUrl: shareImgUrl, // 分享图标
      });
    });

    wx.error(err => {
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，
      // 也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      fail && fail(err.message);
    });
  }, [props]);

  const onShare = useCallback(() => {
    if (userAgent.weixin || userAgent.qq) {
      setShowGuide(true);
      return;
    }

    if (userAgent.ios) {
      location.href = userAgent.href;

      return;
    }

    location.href = userAgent.href.replace('https', 'api');
  }, [userAgent]);

  const onCloseGuide = () => {
    setShowGuide(false);
  };

  return (
    <div onClick={onShare}>
      {props.children}
      {showGuide ? <Guide visible={showGuide} close={onCloseGuide} /> : null}
    </div>
  );
}

function Guide({ close }) {
  const onClose = useCallback(() => {
    close && close();
  }, [close]);

  return (
    <div className={styles.guideModal} onClick={onClose}>
      <div className={styles.arrow}>
        <img src={icon3} alt="箭头" />
      </div>
      <div className={styles.content}>
        <div className={styles.first}>
          <span>1.点击右上角图标</span>
          <div className={styles.icon}>
            <img src={icon4} alt="引导图片" />
          </div>
        </div>
        <div className={styles.first}>
          <span>2.点击在</span>
          <div className={styles.icon}>
            <img src={icon5} alt="引导图片" />
          </div>
          <span>浏览器打开</span>
        </div>
      </div>
    </div>
  );
}
