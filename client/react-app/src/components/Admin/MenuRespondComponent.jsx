import React from 'react';
import { Badge, Descriptions } from 'antd';
const items = [
  {
    key: '1',
    label: '種類',
    children: 'Cloud Database',
  },
  {
    key: '2',
    label: '標籤',
    children: 'Prepaid',
  },
  {
    key: '3',
    label: '品名',
    children: 'YES',
    span: 2,
  },
  {
    key: '4',
    label: '價格',
    children: '2018-04-24 18:00:00',
    span: 2,
  },
  {
    key: '5',
    label: '商品描述',
    children: '2019-04-24 18:00:00',
    span: 3,
  },
  {
    key: '6',
    label: '供應狀態',
    children: <Badge status="processing" text="供應中" />,
    span: 3,
  },
  {
    key: '7',
    label: '商品圖片',
    children: '2019-04-24 18:00:00',
    span: 10,
  },
];
const MenuRespondComponent = () => (
  <Descriptions title="User Info" bordered items={items} />
);
export default MenuRespondComponent;
