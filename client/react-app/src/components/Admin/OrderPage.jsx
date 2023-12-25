import React, { useState, useEffect } from 'react';
import LayoutComponent from './LayoutComponent';
import DrawerComponent from './DrawerComponent';
import OrderTabsComponent from './OrderTabsComponent';

const OrderPage = () => {
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    document.title = 'Order';
  }, []);

  const addToCart = (itemToAdd) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem._id === itemToAdd._id,
    );

    if (existingItemIndex > -1) {
      const newCartItems = cartItems.map((cartItem, index) =>
        index === existingItemIndex
          ? {
              ...cartItem,
              qty: cartItem.qty + itemToAdd.qty,
              amount: cartItem.qty * cartItem.price + itemToAdd.amount,
            }
          : cartItem,
      );
      setCartItems(newCartItems);
    } else {
      setCartItems([...cartItems, itemToAdd]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/1.0/admin/menu`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData.map((item, index) => ({ ...item, key: item._id })));
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

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
          <DrawerComponent cartItems={cartItems} setCartItems={setCartItems} />
        </div>
        <OrderTabsComponent data={data} addToCart={addToCart} />
      </LayoutComponent>
    </div>
  );
};

export default OrderPage;
