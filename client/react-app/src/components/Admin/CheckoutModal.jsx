import React, { useState, useCallback } from 'react';
import { Modal } from 'antd';
import CheckoutSubmitComponent from './CheckoutSubmitComponent';
import AlertComponent from './AlertComponent';

const CheckoutModal = ({
  isOpen,
  setIsOpen,
  currentOrder,
  onTransactionComplete,
}) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [checkoutData, setCheckoutData] = useState({});
  const [alert, setAlert] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleOk = () => {
    setConfirmLoading(true);
    fetch(`${apiUrl}/api/1.0/admin/postCheckout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(checkoutData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('交易失敗');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setAlert({ type: 'success', message: '交易成功' });

        setTimeout(() => {
          setIsOpen(false);
          setConfirmLoading(false);
          setAlert(null);
          onTransactionComplete();
        }, 2000);
      })
      .catch((error) => {
        console.error('Error:', error);
        setConfirmLoading(false);
        setAlert({ type: 'error', message: error.message });
      });
  };

  const handleCancel = () => {
    setIsOpen(false);
    setAlert(null); // 清除警告信息
  };

  const updateCheckoutData = useCallback((data) => {
    setCheckoutData(data);
  }, []);

  return (
    <>
      <Modal
        title="Title"
        open={isOpen}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {alert && (
          <AlertComponent
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}
        <CheckoutSubmitComponent
          currentOrder={currentOrder}
          updateCheckoutData={updateCheckoutData}
        />
      </Modal>
    </>
  );
};
export default CheckoutModal;
