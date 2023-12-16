import React, { useState, useEffect } from 'react';
import { Table, InputNumber } from 'antd';
import AlertComponent from './AlertComponent';

const OrderTablesComponents = ({ data, addToCart }) => {
  const [updatedData, setUpdatedData] = useState([]);
  const [alertInfo, setAlertInfo] = useState({
    show: false,
    type: '',
    message: '',
  });

  useEffect(() => {
    setUpdatedData(
      data.map((item) => ({
        ...item,
        qty: 1,
        amount: item.price,
      })),
    );
  }, [data]);

  const onQuantityChange = (index, value) => {
    const newData = [...updatedData];
    newData[index] = {
      ...newData[index],
      qty: value,
      amount: newData[index].price * value,
    };
    setUpdatedData(newData);
  };

  const handleAddToCart = (index) => {
    addToCart(updatedData[index]);
    setAlertInfo({
      show: true,
      type: 'success',
    });
  };

  const handleCloseAlert = () => {
    setAlertInfo((prev) => ({ ...prev, show: false }));
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
          onClick={() => {
            handleAddToCart(index);
          }}
        >
          加入
        </button>
      ),
    },
  ];

  return (
    <>
      {alertInfo.show && (
        <div
          style={{
            position: 'fixed',
            top: '6%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 1000,
            width: 600,
          }}
        >
          <AlertComponent
            type={alertInfo.type}
            message={alertInfo.message}
            onClose={handleCloseAlert}
            autoCloseAfter={1000}
          />
        </div>
      )}
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
    </>
  );
};
export default OrderTablesComponents;
