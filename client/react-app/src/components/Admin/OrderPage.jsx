import React from 'react';
import LayoutComponent from './LayoutComponent';
import DrawerComponent from './DrawerComponent';
import OrderTabsComponent from './OrderTabsComponent';

const OrderPage = () => {
  return (
    <div>
      <LayoutComponent>
        <div
          style={{
            position: 'relative',
            top: '-15%',
            left: '98%',
            maxWidth: 50,
          }}
        >
          <DrawerComponent />
        </div>
        <OrderTabsComponent />
      </LayoutComponent>
    </div>
  );
};

export default OrderPage;
