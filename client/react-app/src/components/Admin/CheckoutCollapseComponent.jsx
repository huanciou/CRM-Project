import React, { useState, useEffect } from 'react';
import { Collapse, theme } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import CheckoutListComponent from './CheckoutListComponent';

const CheckoutCollapseComponent = () => {
  const { token } = theme.useToken();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/1.0/admin/fetchOrder')
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => console.error('Error fetching orders:', error));
  }, []);

  const getItems = (orders, panelStyle) => {
    return orders.map((order) => {
      const orderItemsText = order.order_Items
        .map(
          (item) =>
            `${item.name} - Quantity: ${item.qty}, Price: ${item.price}, Total: ${item.amount}`,
        )
        .join('\n');

      return {
        key: order._id,
        label: `訂單編號：${order._id}`,
        children: (
          // <div>
          //   <p>{orderItemsText}</p>
          // </div>
          <CheckoutListComponent />
        ),
        style: panelStyle,
      };
    });
  };

  const panelStyle = {
    marginBottom: 24,
    background: '#f0f2f5',
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  return (
    <Collapse
      className="custom-CheckoutCollapseComponent"
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      style={{ background: token.colorBgContainer }}
      items={getItems(orders, panelStyle)}
    />
  );
};

export default CheckoutCollapseComponent;
