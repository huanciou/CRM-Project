import React, { useEffect, useRef, useState, useCallback } from 'react';
import LayoutComponent from './LayoutComponent';
import CheckoutCollapseComponent from './CheckoutCollapseComponent';
import io from 'socket.io-client';
import Cookies from 'js-cookie';
import { message } from 'antd';

const CheckoutPage = () => {
  const [orders, setOrders] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    document.title = 'Checkout';
  }, []);

  const fetchOrders = useCallback(() => {
    fetch(`${apiUrl}/api/1.0/admin/fetchOrder`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => console.error('Error fetching orders:', error));
  }, [apiUrl]); // 添加 apiUrl 作為依賴

  const socketRef = useRef(null);
  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io();
      const dbToken = Cookies.get('dbToken');

      socketRef.current.on(dbToken, (data) => {
        fetchOrders();
        message.info('你有新訂單', 3);
      });

      return () => {
        socketRef.current.off('msg');
        socketRef.current.close();
      };
    }
  }, []);

  return (
    <div>
      <LayoutComponent>
        <React.Fragment>
          <CheckoutCollapseComponent
            fetchOrders={fetchOrders}
            orders={orders}
          />
        </React.Fragment>
      </LayoutComponent>
    </div>
  );
};

export default CheckoutPage;
