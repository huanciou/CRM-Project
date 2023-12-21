import React, { useState, useEffect, useRef } from 'react';
import { Table, Button, message } from 'antd';
import CheckoutModal from './CheckoutModal';

const columns = [
  {
    title: '商品圖片',
    dataIndex: 'main_image',
    key: 'main_image',
    render: (text) => (
      <img
        src={`https://d3nexs9enmvorf.cloudfront.net/${text}`}
        alt="Product"
        style={{ maxWidth: '120px', maxHeight: '100px' }}
      />
    ),
  },
  {
    title: '品名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '種類',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: '價格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '數量',
    dataIndex: 'qty',
    key: 'qty',
  },
  {
    title: '總額',
    dataIndex: 'amount',
    key: 'amount',
  },
];

const CheckoutListComponent = ({ order, fetchOrders }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [enhancedOrder, setEnhancedOrder] = useState(order);
  const apiUrl = process.env.REACT_APP_API_URL;

  const data = enhancedOrder.order_Items.map((item) => ({
    ...item,
    key: item._id, // 确保每行数据有唯一的 key
  }));

  useEffect(() => {
    const amount = order.order_Items.reduce(
      (acc, item) => acc + item.amount,
      0,
    );
    setEnhancedOrder({ ...order, amount });
  }, [order]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancelOrder = () => {
    const deleteOrderUrl = `${apiUrl}/api/1.0/admin/deleteOrder`;
    fetch(deleteOrderUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: order._id }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('請求失敗');
        }
        return res.json();
      })
      .then(() => {
        message.success('訂單取消成功');
        fetchOrders();
      })
      .catch((error) => {
        message.error('訂單取消失敗: ' + error.message);
      });
  };

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        footer={() => (
          <div
            style={{
              margin: '20px 0 5px 0',
              textAlign: 'right',
              padding: '10px',
            }}
          >
            <span
              style={{ marginRight: '40px', fontSize: '20px', color: 'red' }}
            >
              總金額: ${enhancedOrder.amount}
            </span>
            <Button
              style={{
                marginRight: '10px',
                color: '#4267B2',
                backgroundColor: 'white',
                borderColor: '#4267B2',
              }}
              onClick={showModal}
            >
              結帳
            </Button>
            <Button danger onClick={handleCancelOrder}>
              取消訂單
            </Button>
          </div>
        )}
      />
      {isModalVisible && (
        <CheckoutModal
          isOpen={isModalVisible}
          setIsOpen={setIsModalVisible}
          currentOrder={enhancedOrder}
          onTransactionComplete={fetchOrders}
        />
      )}
    </>
  );
};

export default CheckoutListComponent;
