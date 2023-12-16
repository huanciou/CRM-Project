import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Drawer } from 'antd';
import CartListComponent from './CartListComponent';

const DrawerComponent = ({ cartItems, setCartItems }) => {
  console.log(`DrawerComponent: ${cartItems}`);
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
      <Drawer
        width={'50vw'}
        title="購物車"
        placement="right"
        onClose={onClose}
        open={open}
      >
        <CartListComponent cartItems={cartItems} setCartItems={setCartItems} />
      </Drawer>
    </>
  );
};
export default DrawerComponent;
