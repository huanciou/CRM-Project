import React, { useState } from 'react';
import { List, Button, Input, message } from 'antd';

const CartListComponent = ({ cartItems, setCartItems }) => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const checkoutUrl = `${apiUrl}/api/1.0/admin/createOrder`;
  const [tableID, setTableID] = useState('');
  const totalAmount = cartItems.reduce((acc, item) => acc + item.amount, 0);

  const transformCartData = (cartItems) => {
    console.log(cartItems);
    return cartItems.map((item) => ({
      item_ID: item._id,
      name: item.name,
      tags: item.tags,
      category: item.category,
      qty: item.qty,
      price: item.price,
      amount: item.amount,
      main_image: item.main_image,
    }));
  };

  const handleCheckout = () => {
    if (!tableID) {
      message.error('請填寫桌號');
      return;
    }

    if (isCartEmpty) {
      message.error('購物車是空的');
      return;
    }

    const orderData = {
      table_ID: tableID,
      order_Items: transformCartData(cartItems),
    };

    fetch(checkoutUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => {
        message.success(`桌號：${data.table_ID}  點餐成功！`);
        handleReset();
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleReset = () => {
    if (isCartEmpty) {
      message.error('購物車已經是空的囉');
      return;
    }
    setCartItems([]);
    setTableID('');
  };

  const isCartEmpty = cartItems.length === 0;

  return (
    <div>
      <div style={{ marginBottom: 36 }}>
        <strong style={{ fontSize: 20, color: 'rgba(255, 0, 0, 0.6)' }}>
          購物車總金額 $ {totalAmount}
        </strong>
      </div>
      <div style={{ marginTop: 16 }}>
        <Input
          placeholder="請填寫桌號"
          value={tableID}
          onChange={(e) => setTableID(e.target.value)}
        />
      </div>
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={cartItems}
        footer={
          !isCartEmpty && ( // 如果购物车不为空，则显示 footer
            <div style={{ marginTop: 32 }}>
              <Button type="primary" onClick={handleCheckout}>
                點餐
              </Button>
              <Button style={{ marginLeft: 16 }} onClick={handleReset}>
                重置購物車
              </Button>
            </div>
          )
        }
        renderItem={(item) => (
          <List.Item
            key={item._id}
            extra={
              <img
                width={272}
                alt="Product"
                src={`https://d3nexs9enmvorf.cloudfront.net/${item.main_image}`}
              />
            }
          >
            <List.Item.Meta
              title={item.name}
              description={<p>{item.story}</p>}
            />
            <p style={{ fontSize: '14px', marginBottom: 6 }}>
              數量: {item.qty}
            </p>
            <p style={{ fontSize: '14px', marginBottom: 6 }}>
              價格: {item.price}
            </p>
            <p style={{ fontSize: '14px', marginBottom: 6 }}>
              總價: {item.amount}
            </p>
          </List.Item>
        )}
      />
    </div>
  );
};

export default CartListComponent;
