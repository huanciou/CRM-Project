import React from 'react';
import { QRCode, Space } from 'antd';

const QRCodeComponent = ({ id }) => {
  // const [text, setText] = React.useState('1231231231');
  return (
    <Space direction="vertical" align="center">
      <QRCode value={id || '-'} />
    </Space>
  );
};

export default QRCodeComponent;
