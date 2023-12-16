import React, { useState } from 'react';
import { List, Button, Input } from 'antd';

const CartListComponent = ({ cartItems, setCartItems }) => {
  const checkoutUrl = 'http://localhost:3000/api/1.0/admin/createOrder';
  const [tableID, setTableID] = useState('');
  const totalAmount = cartItems.reduce((acc, item) => acc + item.amount, 0);

  const transformCartData = (cartItems) => {
    return cartItems.map((item) => ({
      item_ID: item._id,
      name: item.name,
      tags: item.tags,
      qty: item.qty,
      price: item.price,
      amount: item.amount,
    }));
  };

  const handleCheckout = () => {
    if (!tableID) {
      alert('請填寫桌號');
      return;
    }

    if (!totalAmount) {
      alert('購物車是空的');
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
        alert(`桌號：${data.table_ID}  點餐成功！`);
        handleReset();
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleReset = () => {
    setCartItems([]);
    setTableID('');
  };

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
          <div style={{ marginTop: 32 }}>
            <Button type="primary" onClick={handleCheckout}>
              結帳
            </Button>
            <Button style={{ marginLeft: 16 }} onClick={handleReset}>
              重置購物車
            </Button>
          </div>
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
