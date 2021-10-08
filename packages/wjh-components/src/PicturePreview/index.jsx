import React, { useCallback } from 'react';
import Carousel, { Modal, ModalGateway } from 'react-images';

export default function PicturePreview({ data = [], current = 0, close }) {
  const onCloseGateway = useCallback(() => {
    close && close();
  }, [close]);

  return (
    <ModalGateway>
      <Modal onClose={onCloseGateway}>
        <Carousel views={data} currentIndex={current} />
      </Modal>
    </ModalGateway>
  );
}
