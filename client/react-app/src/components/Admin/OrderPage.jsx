import React, { useState, useEffect } from 'react';
import LayoutComponent from './LayoutComponent';
import DrawerComponent from './DrawerComponent';
import OrderTabsComponent from './OrderTabsComponent';

const OrderPage = () => {
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem._id === item._id,
    );

    if (existingItemIndex > -1) {
      const newCartItems = [...cartItems];
      newCartItems[existingItemIndex] = {
        ...newCartItems[existingItemIndex],
        qty: newCartItems[existingItemIndex].qty + item.qty,
        amount:
          newCartItems[existingItemIndex].price *
          (newCartItems[existingItemIndex].qty + item.qty),
      };
      setCartItems(newCartItems);
    } else {
      setCartItems([
        ...cartItems,
        { ...item, qty: item.qty, amount: item.price * item.qty },
      ]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/api/1.0/admin/menu',
        );
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
