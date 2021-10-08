import React, { useRef, useCallback } from 'react';
import { Modal } from 'antd';
import Cropper from 'react-cropper';
import { fileCtrl } from 'wjh-util';
import 'cropperjs/dist/cropper.css';

export default function PictureCropper({ url, aspectRatio = 1, ok, cancel }) {
  const cropperRef = useRef(null);

  const onClose = useCallback(() => {
    cancel && cancel();
  }, [cancel]);

  const onOk = useCallback(() => {
    const data = cropperRef.current.getCroppedCanvas().toDataURL();
    const file = fileCtrl.base64UrlToFileObject(data);

    ok && ok(file);
  }, [ok]);

  return (
    <Modal onOk={onOk} onCancel={onClose}>
      <Cropper ref={cropperRef} src={url} aspectRatio={aspectRatio} guides={false} />
    </Modal>
  );
}
