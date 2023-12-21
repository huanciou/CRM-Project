import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Input, InputNumber } from 'antd';

const CheckoutItemsComponent = ({ order, pay, onCheckoutDataChange }) => {
  console.log(order);
  const [userId, setUserId] = useState('');
  const [oneTimeKey, setOneTimeKey] = useState('');

  const handleInputChange = (name, value) => {
    if (name === 'userID') {
      setUserId(value);
    } else if (name === 'oneTimeKey') {
      setOneTimeKey(value);
    }

    // 更新 checkoutData
    onCheckoutDataChange({
      type: pay,
      userId: name === 'userID' ? value : userId,
      oneTimeKey: name === 'oneTimeKey' ? value : oneTimeKey,
      orderId: order._id,
      amount: order.amount,
      _id: order._id,
      order_Items: order.order_Items,
    });
  };

  return (
    <div>
      <Input
        name="userID"
        size="large"
        placeholder="會員編號"
        prefix={<UserOutlined />}
        value={userId}
        onChange={(e) => handleInputChange('userID', e.target.value)}
      />
      <br />
      <br />
      <Input
        name="oneTimeKey"
        size="large"
        placeholder="LINE Pay 收款碼"
        prefix={<UserOutlined />}
        value={oneTimeKey}
        onChange={(e) => handleInputChange('oneTimeKey', e.target.value)}
      />
      <br />
      <br />
      <Input
        name="orderId"
        size="large"
        placeholder="訂單編號"
        prefix={<UserOutlined />}
        value={order._id}
        readOnly
      />
      <br />
      <br />
      <InputNumber
        name="amount"
        size="large"
        placeholder="總金額"
        prefix={<UserOutlined />}
        value={order.amount}
        readOnly
      />
      <br />
      <br />
    </div>
  );
};

export default CheckoutItemsComponent;
