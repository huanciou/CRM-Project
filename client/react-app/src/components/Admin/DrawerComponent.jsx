import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Drawer } from 'antd';

const DrawerComponent = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <FontAwesomeIcon
        id="cart-button"
        icon={faShoppingCart}
        onClick={showDrawer}
      />
      {/* <i
        className="far fa-shopping-cart"
        onClick={showDrawer}
        style={{ cursor: 'pointer' }}
      ></i> */}
      <Drawer title="購物車" placement="right" onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};
export default DrawerComponent;
