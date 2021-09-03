import React, { useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.scss';

const iconMap = {
  success:
    'data:image/png;base64,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',
  fail: 'data:image/png;base64,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',
  loading:
    'data:image/gif;base64,R0lGODlhgACAAPIAAP///93d3bu7u5mZmQAA/wAAAAAAAAAAACH5BAUFAAQAIf8LTkVUU0NBUEUyLjADAQAAACwCAAIAfAB8AAAD/ki63P4wygYqmDjrzbtflvWNZGliYXiubKuloivPLlzReD7al+7/Eh5wSFQIi8hHYBkwHUmD6CD5YTJLz49USuVYraRsZ7vtar7XnQ1Kjpoz6LRHvGlz35O4nEPP2O94EnpNc2sef1OBGIOFMId/inB6jSmPdpGScR19EoiYmZobnBCIiZ95k6KGGp6ni4wvqxilrqBfqo6skLW2YBmjDa28r6Eosp27w8Rov8ekycqoqUHODrTRvXsQwArC2NLF29UM19/LtxO5yJd4Au4CK7DUNxPebG4e7+8n8iv2WmQ66BtoYpo/dvfacBjIkITBE9DGlMvAsOIIZjIUAixl/opixYZVtLUos5GjwI8gzc3iCGghypQqrbFsme8lwZgLZtIcYfNmTJ34WPTUZw5oRxdD9w0z6iOpO15MgTh1BTTJUKos39jE+o/KS64IFVmsFfYT0aU7capdy7at27dw48qdS7eu3bt480I02vUbX2F/JxYNDImw4GiGE/P9qbhxVpWOI/eFKtlNZbWXuzlmG1mv58+gQ4seTbq06dOoU6vGQZJy0FNlMcV+czhQ7SQmYd8eMhPs5BxVdfcGEtV3buDBXQ+fURxx8oM6MT9P+Fh6dOrH2zavc13u9JXVJb520Vp8dvC76wXMuN5Sepm/1WtkEZHDefnzR9Qvsd9+vv8I+en3X0ntYVcSdAE+UN4zs7ln24CaLagghIxBaGF8kFGoIYV+Ybghh841GIyI5ICIFoklJsigihmimJOLEbLYIYwxSgigiZ+8l2KB+Ml4oo/w8dijjcrouCORKwIpnJIjMnkkksalNeR4fuBIm5UEYImhIlsGCeWNNJphpJdSTlkml1jWeOY6TnaRpppUctcmFW9mGSaZceYopH9zkjnjUe59iR5pdapWaGqHopboaYua1qije67GJ6CuJAAAIfkEBQUABAAsCgACAFcAMAAAA/5Iutz+ML5Ag7w46z0r5WAoSp43nihXVmnrdusrv+s332dt4Tyo9yOBUJD6oQBIQGs4RBlHySSKyczVTtHoidocPUNZaZAr9F5FYbGI3PWdQWn1mi36buLKFJvojsHjLnshdhl4L4IqbxqGh4gahBJ4eY1kiX6LgDN7fBmQEJI4jhieD4yhdJ2KkZk8oiSqEaatqBekDLKztBG2CqBACq4wJRi4PZu1sA2+v8C6EJexrBAD1AOBzsLE0g/V1UvYR9sN3eR6lTLi4+TlY1wz6Qzr8u1t6FkY8vNzZTxaGfn6mAkEGFDgL4LrDDJDyE4hEIbdHB6ESE1iD4oVLfLAqBTxIsOODwmCDJlv5MSGJklaS6khAQAh+QQFBQAEACwfAAIAVwAwAAAD/ki63P5LSAGrvTjrNuf+YKh1nWieIumhbFupkivPBEzR+GnnfLj3ooFwwPqdAshAazhEGUXJJIrJ1MGOUamJ2jQ9QVltkCv0XqFh5IncBX01afGYnDqD40u2z76JK/N0bnxweC5sRB9vF34zh4gjg4uMjXobihWTlJUZlw9+fzSHlpGYhTminKSepqebF50NmTyor6qxrLO0L7YLn0ALuhCwCrJAjrUqkrjGrsIkGMW/BMEPJcphLgDaABjUKNEh29vdgTLLIOLpF80s5xrp8ORVONgi8PcZ8zlRJvf40tL8/QPYQ+BAgjgMxkPIQ6E6hgkdjoNIQ+JEijMsasNYFdEix4gKP+YIKXKkwJIFF6JMudFEAgAh+QQFBQAEACw8AAIAQgBCAAAD/kg0PPowykmrna3dzXvNmSeOFqiRaGoyaTuujitv8Gx/661HtSv8gt2jlwIChYtc0XjcEUnMpu4pikpv1I71astytkGh9wJGJk3QrXlcKa+VWjeSPZHP4Rtw+I2OW81DeBZ2fCB+UYCBfWRqiQp0CnqOj4J1jZOQkpOUIYx/m4oxg5cuAaYBO4Qop6c6pKusrDevIrG2rkwptrupXB67vKAbwMHCFcTFxhLIt8oUzLHOE9Cy0hHUrdbX2KjaENzey9Dh08jkz8Tnx83q66bt8PHy8/T19vf4+fr6AP3+/wADAjQmsKDBf6AOKjS4aaHDgZMeSgTQcKLDhBYPEswoA1BBAgAh+QQFBQAEACxOAAoAMABXAAAD7Ei6vPOjyUkrhdDqfXHm4OZ9YSmNpKmiqVqykbuysgvX5o2HcLxzup8oKLQQix0UcqhcVo5ORi+aHFEn02sDeuWqBGCBkbYLh5/NmnldxajX7LbPBK+PH7K6narfO/t+SIBwfINmUYaHf4lghYyOhlqJWgqDlAuAlwyBmpVnnaChoqOkpaanqKmqKgGtrq+wsbA1srW2ry63urasu764Jr/CAb3Du7nGt7TJsqvOz9DR0tPU1TIA2ACl2dyi3N/aneDf4uPklObj6OngWuzt7u/d8fLY9PXr9eFX+vv8+PnYlUsXiqC3c6PmUUgAACH5BAUFAAQALE4AHwAwAFcAAAPpSLrc/m7IAau9bU7MO9GgJ0ZgOI5leoqpumKt+1axPJO1dtO5vuM9yi8TlAyBvSMxqES2mo8cFFKb8kzWqzDL7Xq/4LB4TC6bz1yBes1uu9uzt3zOXtHv8xN+Dx/x/wJ6gHt2g3Rxhm9oi4yNjo+QkZKTCgGWAWaXmmOanZhgnp2goaJdpKGmp55cqqusrZuvsJays6mzn1m4uRAAvgAvuBW/v8GwvcTFxqfIycA3zA/OytCl0tPPO7HD2GLYvt7dYd/ZX99j5+Pi6tPh6+bvXuTuzujxXens9fr7YPn+7egRI9PPHrgpCQAAIfkEBQUABAAsPAA8AEIAQgAAA/lIutz+UI1Jq7026h2x/xUncmD5jehjrlnqSmz8vrE8u7V5z/m5/8CgcEgsGo/IpHLJbDqf0Kh0ShBYBdTXdZsdbb/Yrgb8FUfIYLMDTVYz2G13FV6Wz+lX+x0fdvPzdn9WeoJGAYcBN39EiIiKeEONjTt0kZKHQGyWl4mZdREAoQAcnJhBXBqioqSlT6qqG6WmTK+rsa1NtaGsuEu6o7yXubojsrTEIsa+yMm9SL8osp3PzM2cStDRykfZ2tfUtS/bRd3ewtzV5pLo4eLjQuUp70Hx8t9E9eqO5Oku5/ztdkxi90qPg3x2EMpR6IahGocPCxp8AGtigwQAIfkEBQUABAAsHwBOAFcAMAAAA/5Iutz+MMo36pg4682J/V0ojs1nXmSqSqe5vrDXunEdzq2ta3i+/5DeCUh0CGnF5BGULC4tTeUTFQVONYAs4CfoCkZPjFar83rBx8l4XDObSUL1Ott2d1U4yZwcs5/xSBB7dBMBhgEYfncrTBGDW4WHhomKUY+QEZKSE4qLRY8YmoeUfkmXoaKInJ2fgxmpqqulQKCvqRqsP7WooriVO7u8mhu5NacasMTFMMHCm8qzzM2RvdDRK9PUwxzLKdnaz9y/Kt8SyR3dIuXmtyHpHMcd5+jvWK4i8/TXHff47SLjQvQLkU+fG29rUhQ06IkEG4X/Rryp4mwUxSgLL/7IqBRRB8eONT6ChCFy5ItqJomES6kgAQAh+QQFBQAEACwKAE4AVwAwAAAD/ki63A4QuEmrvTi3yLX/4MeNUmieITmibEuppCu3sDrfYG3jPKbHveDktxIaF8TOcZmMLI9NyBPanFKJp4A2IBx4B5lkdqvtfb8+HYpMxp3Pl1qLvXW/vWkli16/3dFxTi58ZRcChwIYf3hWBIRchoiHiotWj5AVkpIXi4xLjxiaiJR/T5ehoomcnZ+EGamqq6VGoK+pGqxCtaiiuJVBu7yaHrk4pxqwxMUzwcKbyrPMzZG90NGDrh/JH8t72dq3IN1jfCHb3L/e5ebh4ukmxyDn6O8g08jt7tf26ybz+m/W9GNXzUQ9fm1Q/APoSWAhhfkMAmpEbRhFKwsvCsmoE7EHx444PoKcIXKkjIImjTzjkQAAIfkEBQUABAAsAgA8AEIAQgAAA/VIBNz+8KlJq72Yxs1d/uDVjVxogmQqnaylvkArT7A63/V47/m2/8CgcEgsGo/IpHLJbDqf0Kh0Sj0FroGqDMvVmrjgrDcTBo8v5fCZki6vCW33Oq4+0832O/at3+f7fICBdzsChgJGeoWHhkV0P4yMRG1BkYeOeECWl5hXQ5uNIAOjA1KgiKKko1CnqBmqqk+nIbCkTq20taVNs7m1vKAnurtLvb6wTMbHsUq4wrrFwSzDzcrLtknW16tI2tvERt6pv0fi48jh5h/U6Zs77EXSN/BE8jP09ZFA+PmhP/xvJgAMSGBgQINvEK5ReIZhQ3QEMTBLAAAh+QQFBQAEACwCAB8AMABXAAAD50i6DA4syklre87qTbHn4OaNYSmNqKmiqVqyrcvBsazRpH3jmC7yD98OCBF2iEXjBKmsAJsWHDQKmw571l8my+16v+CweEwum8+hgHrNbrvbtrd8znbR73MVfg838f8BeoB7doN0cYZvaIuMjY6PkJGSk2gClgJml5pjmp2YYJ6dX6GeXaShWaeoVqqlU62ir7CXqbOWrLafsrNctjIDwAMWvC7BwRWtNsbGFKc+y8fNsTrQ0dK3QtXAYtrCYd3eYN3c49/a5NVj5eLn5u3s6e7x8NDo9fbL+Mzy9/T5+tvUzdN3Zp+GBAAh+QQJBQAEACwCAAIAfAB8AAAD/ki63P4wykmrvTjrzbv/YCiOZGmeaKqubOu+cCzPdArcQK2TOL7/nl4PSMwIfcUk5YhUOh3M5nNKiOaoWCuWqt1Ou16l9RpOgsvEMdocXbOZ7nQ7DjzTaeq7zq6P5fszfIASAYUBIYKDDoaGIImKC4ySH3OQEJKYHZWWi5iZG0ecEZ6eHEOio6SfqCaqpaytrpOwJLKztCO2jLi1uoW8Ir6/wCHCxMG2x7muysukzb230M6H09bX2Nna29zd3t/g4cAC5OXm5+jn3Ons7eba7vHt2fL16tj2+QL0+vXw/e7WAUwnrqDBgwgTKlzIsKHDh2gGSBwAccHEixAvaqTYUXCjRoYeNyoM6REhyZIHT4o0qPIjy5YTTcKUmHImx5cwE85cmJPnSYckK66sSAAj0aNIkypdyrSp06dQo0qdSrWq1atYs2rdyrWr169gwxZJAAA7',
};

function Toast({ title = '', icon = '', duration = 2000 }) {
  useEffect(() => {
    let timer = setTimeout(() => {
      timer = null;
      Toast.hideToast();
    }, duration);

    return () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
  }, [duration]);

  return (
    <div className={styles.wrap}>
      <div className={styles.content}>
        {iconMap[icon] ? <img className={styles.icon} src={iconMap[icon]} alt="图标" /> : null}
        <span>{title}</span>
      </div>
    </div>
  );
}

function Modal({
  title = '温馨提示',
  content = '',
  confirmColor = '#666',
  confirmText = '确认',
  showCancel = true,
  cancelColor = '#666',
  cancelText = '取消',
  ok,
  cancel,
}) {
  const onCancle = useCallback(() => {
    Toast.hideModal();

    cancel && cancel();
  }, [cancel]);

  const onOk = useCallback(() => {
    Toast.hideModal();

    ok && ok();
  }, [ok]);

  return (
    <div className={styles.wrap} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          {title ? <span className={styles.title}>{title}</span> : null}
          {content ? <span className={styles.word}>{content}</span> : null}
        </div>
        <div className={styles.btnWrap}>
          {showCancel ? (
            <div className={styles.btn} style={{ color: cancelColor }} onClick={onCancle}>
              {cancelText}
            </div>
          ) : null}
          <div className={styles.btn} style={{ color: confirmColor }} onClick={onOk}>
            {confirmText}
          </div>
        </div>
      </div>
    </div>
  );
}

function Loading({ title = '', isMask = true }) {
  return (
    <div className={styles.wrap} style={{ pointerEvents: isMask ? 'auto' : 'none' }}>
      <div className={styles.loadingContent}>
        <img className={styles.icon} src={iconMap.loading} alt="加载图标" />
        {title ? <span className={styles.title}>{title}</span> : null}
      </div>
    </div>
  );
}

Toast.showToast = (() => {
  let div = null;
  let Cmp = null;

  Toast.hideToast = () => {
    if (div) {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
      div = null;
      Cmp = null;
    }
  };

  return (props = {}) => {
    Toast.hideToast();

    div = document.createElement('div');

    document.body.appendChild(div);

    Cmp = <Toast {...props} />;

    ReactDOM.render(Cmp, div);
  };
})();

Toast.showModal = (() => {
  let div = null;
  let Cmp = null;

  Toast.hideModal = () => {
    if (div) {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
      div = null;
      Cmp = null;
    }
  };

  return (props = {}) => {
    Toast.hideModal();

    div = document.createElement('div');

    document.body.appendChild(div);

    Cmp = <Modal {...props} />;

    ReactDOM.render(Cmp, div);
  };
})();

Toast.showLoading = (() => {
  let div = null;
  let Cmp = null;

  Toast.hideLoading = () => {
    if (div) {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);
      div = null;
      Cmp = null;
    }
  };

  return (props = {}) => {
    Toast.hideLoading();

    div = document.createElement('div');

    document.body.appendChild(div);

    Cmp = <Loading {...props} />;

    ReactDOM.render(Cmp, div);
  };
})();

export default Toast;
