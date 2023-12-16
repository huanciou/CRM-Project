import React, { useState, useEffect } from 'react';
import LayoutComponent from './LayoutComponent';
import DrawerComponent from './DrawerComponent';
import OrderTabsComponent from './OrderTabsComponent';

const OrderPage = () => {
  const [data, setData] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
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
          <DrawerComponent cartItems={cartItems} />
        </div>
        <OrderTabsComponent data={data} addToCart={addToCart} />
      </LayoutComponent>
    </div>
  );
};

export default OrderPage;
