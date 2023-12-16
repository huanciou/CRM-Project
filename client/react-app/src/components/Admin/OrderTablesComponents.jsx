import React, { useState } from 'react';
import { Table, InputNumber } from 'antd';

const OrderTablesComponents = ({ data, addToCart }) => {
  const [updatedData, setUpdatedData] = useState(
    data.map((item) => ({
      ...item,
      qty: 1, // 默认数量为1
      amount: item.price, // 默认总额等于单价
    })),
  );

  const onQuantityChange = (index, value) => {
    const newData = [...updatedData];
    newData[index] = {
      ...newData[index],
      qty: value, // 更新数量
      amount: newData[index].price * value, // 更新总额
    };
    setUpdatedData(newData); // 更新 state
  };

  const handleAddToCart = (index) => {
    addToCart(updatedData[index]); // 添加具有更新数量和总额的商品到购物车
  };

  const columns = [
    {
      title: '商品圖片',
      dataIndex: 'main_image',
      key: 'image',
      render: (text, record) => (
        <img
          src={`https://d3nexs9enmvorf.cloudfront.net/${record.main_image}`}
          alt="Product"
          style={{
            maxWidth: '120px',
            maxHeight: '100px',
            // objectFit: 'cover',
            borderRadius: 3,
            textAlign: 'center',
          }}
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
      key: 'qty',
      render: (_, record, index) => (
        <InputNumber
          min={1}
          keyboard={false}
          defaultValue={1}
          onChange={(value) => onQuantityChange(index, value)}
        />
      ),
    },
    {
      title: '總額',
      key: 'amount',
      render: (_, record) => <span>{record.amount}</span>,
    },
    {
      title: '購物車',
      dataIndex: '',
      key: 'x',
      render: (record_, __, index) => (
        <button
          style={{
            backgroundColor: '#4267B2',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 15px',
            fontSize: '16px',
            cursor: 'pointer',
            outline: 'none',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            transition: 'background-color 0.1s',
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor = '#365899')
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = '#4267B2')
          }
          onClick={() => handleAddToCart(index)}
        >
          加入
        </button>
      ),
    },
  ];

  return (
    <Table
      style={{ minWidth: 1100 }}
      columns={columns}
      pagination={{ pageSize: 5 }}
      expandable={{
        expandedRowRender: (record) => (
          <p
            style={{
              margin: 0,
              padding: 10,
              textAlign: 'center',
            }}
          >
            {record.story}
          </p>
        ),
        rowExpandable: (record) => record.name !== 'Not Expandable',
      }}
      dataSource={updatedData}
    />
  );
};
export default OrderTablesComponents;
