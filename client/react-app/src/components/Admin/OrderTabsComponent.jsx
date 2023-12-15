import React from 'react';
import { Tabs } from 'antd';
import OrderTablesComponent from './OrderTablesComponents';

const OrderTabsComponent = () => {
  return (
    <div style={{ minHeight: 600 }}>
      <Tabs
        defaultActiveKey="1"
        style={{
          height: 220,
        }}
        items={new Array(20).fill(null).map((_, i) => {
          const id = String(i);
          return {
            label: `Category-${id}`,
            key: id,
            disabled: i === 28,
            children: (
              <div style={{ display: 'flex', marginTop: 40 }}>
                <OrderTablesComponent></OrderTablesComponent>
              </div>
            ),
          };
        })}
        tabBarGutter={80}
      />
    </div>
  );
};
export default OrderTabsComponent;
