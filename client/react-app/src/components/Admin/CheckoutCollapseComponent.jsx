import React, { useState, useEffect, useCallback } from 'react';
import { Collapse, theme } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import CheckoutListComponent from './CheckoutListComponent';

const CheckoutCollapseComponent = ({ fetchOrders, orders }) => {
  const { token } = theme.useToken();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

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
        label: (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <p
              style={{
                fontFamily: 'PingFang SC, Arial, sans-serif',
                fontSize: '20px',
                letterSpacing: '3px',
              }}
            >
              桌號：{order.table_ID}
            </p>
            <p
              style={{
                fontFamily: 'PingFang SC, Arial, sans-serif',
                fontSize: '20px',
                letterSpacing: '3px',
              }}
            >
              {new Date(order.order_Time).toLocaleString('zh-TW')}
            </p>
          </div>
        ),
        children: (
          <CheckoutListComponent order={order} fetchOrders={fetchOrders} />
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
