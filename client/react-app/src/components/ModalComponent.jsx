import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import QRCodeComponent from './QRCodeComponent';

const ModalComponent = ({ id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type="primary" onClick={showModal}>
        QRCode
      </Button>
      <Modal
        title={id}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={260}
        centered={true}
      >
        <QRCodeComponent id={id} />
      </Modal>
    </>
  );
};

export default ModalComponent;
