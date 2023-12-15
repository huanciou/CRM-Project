import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: '商品圖片',
    dataIndex: 'image',
    key: 'image',
    render: (text, record) => (
      <img
        src={record.image}
        alt="Product"
        style={{ maxHeight: '100px', maxwidth: '100px' }}
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
    dataIndex: 'tag',
    key: 'tag',
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
    render: () => (
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
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#365899')}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#4267B2')}
      >
        Delete
      </button>
    ),
  },
];
const data = [
  {
    key: 1,
    image:
      'https://d3nexs9enmvorf.cloudfront.net/1a4ff7a9-56fb-4310-9015-85b832953bd1',
    name: 'A5和牛',
    category: '主食',
    tag: '高單價',
    price: '1200',
    description:
      '美味しさを再定義し、行き届いたサービスと美味しい料理の対話環境を創り出し、幸せな味わいが新たな食体験を生み出します！',
  },
  {
    key: 2,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    description:
      'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
  },
  {
    key: 3,
    name: 'Not Expandable',
    age: 29,
    address: 'Jiangsu No. 1 Lake Park',
    description: 'This not expandable',
  },
  {
    key: 4,
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    description:
      'My name is Joe Black, I am 32 years old, living in Sydney No. 1 Lake Park.',
  },
];
const OrderTablesComponents = () => (
  <Table
    style={{ minWidth: 1100 }}
    columns={columns}
    expandable={{
      expandedRowRender: (record) => (
        <p
          style={{
            margin: 0,
            padding: 10,
            textAlign: 'center',
          }}
        >
          {record.description}
        </p>
      ),
      rowExpandable: (record) => record.name !== 'Not Expandable',
    }}
    dataSource={data}
  />
);
export default OrderTablesComponents;
