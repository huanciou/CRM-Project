import React, { useEffect } from 'react';
import { Alert, Space, message } from 'antd';

const AlertComponent = ({ type, message, onClose, autoCloseAfter }) => {
  useEffect(() => {
    if (autoCloseAfter) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseAfter);

      return () => clearTimeout(timer);
    }
  }, [onClose, autoCloseAfter]);

  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
      }}
    >
      {type === 'success' && (
        <Alert message="Success" type="success" showIcon />
      )}
      {type === 'info' && (
        <Alert
          message="Informational Notes"
          description={message}
          type="info"
          showIcon
        />
      )}
      {type === 'warning' && (
        <Alert
          message="Warning"
          description={message}
          type="warning"
          showIcon
        />
      )}
      {type === 'error' && (
        <Alert message="Error" description={message} type="error" showIcon />
      )}
    </Space>
  );
};
export default AlertComponent;
