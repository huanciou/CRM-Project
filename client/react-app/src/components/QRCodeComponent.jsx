import React from 'react';
import { QRCode, Space } from 'antd';

const QRCodeComponent = ({ id }) => {
  return (
    <Space direction="vertical" align="center">
      <QRCode value={id || '-'} size={200} />
    </Space>
  );
};

export default QRCodeComponent;
