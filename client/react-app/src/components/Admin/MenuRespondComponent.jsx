import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

const OrderTablesComponents = () => {
  const [data, setData] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);

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
      title: '標籤',
      dataIndex: 'tags',
      key: 'tags',
    },
    {
      title: '價格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '刪除',
      dataIndex: '',
      key: 'x',
      render: (text, record) => (
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
          onClick={() => deleteMenuContent(record)}
        >
          Delete
        </button>
      ),
    },
  ];

  const deleteMenuContent = (record) => {
    const deleteMenuContentUrl =
      'http://localhost:3000/api/1.0/admin/deletemenuContent';
    fetch(deleteMenuContentUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: record._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert(`Category: ${record.name} deletion successful`);
          // 更新本地數據以反映刪除
          setData((prevData) =>
            prevData.filter((item) => item._id !== record._id),
          );
        } else {
          alert(`Deletion Failed`);
        }
      });
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
        setExpandedRowKeys(jsonData.map((item) => item._id));
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, []);

  const handleExpand = (expanded, record) => {
    const keys = expanded
      ? [...expandedRowKeys, record._id]
      : expandedRowKeys.filter((key) => key !== record._id);
    setExpandedRowKeys(keys);
  };

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
        expandedRowKeys: expandedRowKeys,
        onExpand: handleExpand,
      }}
      dataSource={data}
    />
  );
};

export default OrderTablesComponents;
