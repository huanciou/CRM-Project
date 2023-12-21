import React from 'react';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import CheckoutItemsComponent from './CheckoutItemsComponent';

const CheckoutSubmitComponent = ({ currentOrder, updateCheckoutData }) => {
  const onCheckoutDataChange = (data) => {
    updateCheckoutData(data);
  };

  const tabs = [
    {
      key: 'line_pay',
      label: 'LINE Pay',
      children: (
        <CheckoutItemsComponent
          order={currentOrder}
          pay="LINE Pay"
          onCheckoutDataChange={updateCheckoutData}
        />
      ),
    },
    {
      key: 'cash',
      label: 'Cash',
      children: (
        <CheckoutItemsComponent
          order={currentOrder}
          pay="Cash"
          onCheckoutDataChange={updateCheckoutData}
        />
      ),
    },
  ];

  return <Tabs defaultActiveKey="line_pay" items={tabs} />;
};

export default CheckoutSubmitComponent;
