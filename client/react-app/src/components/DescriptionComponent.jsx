import React from 'react';
import { Descriptions } from 'antd';

const DescriptionComponent = ({ item }) => {
  const list = item.order_Items.map((i, index) => (
    <React.Fragment key={index}>
      <img
        src={i.main_image}
        alt=""
        width="180"
        height="120"
        style={{ borderRadius: '2px' }}
      />
      <br />
      <br />
      <h2 style={{ color: 'navy' }}>{i.name}</h2>
      <br />
      <h3>單價: {i.price}</h3>
      <br />
      <h3>數量: {i.qty}</h3>
      <br />
      <h3>總金額: {i.amount}</h3>
      <br />
      <br />
    </React.Fragment>
  ));
  const items = [
    {
      label: '訂單編號',
      children: <h4>{item._id}</h4>,
    },
    {
      label: '總金額',
      children: <h1 style={{ color: 'red' }}>{item.amount}</h1>,
    },
    {
      label: '訂單內容',
      span: {
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 2,
        xxl: 2,
      },
      children: <>{list}</>,
    },
  ];

  return (
    <Descriptions
      bordered
      column={{
        xs: 1,
        sm: 1,
        md: 1,
        lg: 1,
        xl: 2,
        xxl: 2,
      }}
      items={items}
    />
  );
};

export default DescriptionComponent;
