import React from 'react';
import { Tabs } from 'antd';
import OrderTablesComponent from './OrderTablesComponents';

const OrderTabsComponent = ({ data, addToCart }) => {
  const tabsData = data.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const overviewTab = {
    label: '全部商品',
    key: 'overview',
    children: <OrderTablesComponent data={data} addToCart={addToCart} />,
  };

  const categoryTabs = Object.keys(tabsData).map((category, index) => ({
    label: category,
    key: String(index + 1),
    children: (
      <OrderTablesComponent data={tabsData[category]} addToCart={addToCart} />
    ),
  }));

  const tabs = [overviewTab, ...categoryTabs];

  return (
    <div style={{ minHeight: 600 }}>
      <Tabs
        defaultActiveKey="overview"
        style={{ height: 220 }}
        items={tabs}
        tabBarGutter={60}
      />
    </div>
  );
};

export default OrderTabsComponent;
