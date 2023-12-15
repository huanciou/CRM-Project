import React from 'react';
import LayoutComponent from './LayoutComponent';
import CheckoutCollapseComponent from './CheckoutCollapseComponent';

const CheckoutPage = () => {
  return (
    <div>
      <LayoutComponent>
        <React.Fragment>
          <CheckoutCollapseComponent />
        </React.Fragment>
      </LayoutComponent>
    </div>
  );
};

export default CheckoutPage;
