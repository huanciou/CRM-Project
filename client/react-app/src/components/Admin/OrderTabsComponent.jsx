import React from 'react';
import { Tabs } from 'antd';
import OrderTablesComponent from './OrderTablesComponents';

const OrderTabsComponent = ({ data, addToCart }) => {
  const tabsData = data.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const tabs = Object.keys(tabsData).map((category, index) => ({
    label: category,
    key: String(index),
    children: (
      <OrderTablesComponent data={tabsData[category]} addToCart={addToCart} />
    ),
  }));

  return (
    <div style={{ minHeight: 600 }}>
      <Tabs
        defaultActiveKey="1"
        style={{ height: 220 }}
        items={tabs}
        tabBarGutter={80}
      />
    </div>
  );
};

export default OrderTabsComponent;
