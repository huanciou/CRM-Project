import React from 'react';
import { Descriptions } from 'antd';

const items = [
  {
    label: 'Product',
    children: 'Cloud Database',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Billing',
    children: 'Prepaid',
  },
  {
    label: 'Time',
    children: '18:00:00',
  },
  {
    label: 'Amount',
    children: '$80.00',
  },
  {
    label: 'Config Info',
    span: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3,
      xl: 2,
      xxl: 2,
    },
    children: (
      <>
        Data disk type: MongoDB
        <br />
        Database version: 3.4
        <br />
        Package: dds.mongo.mid
      </>
    ),
  },
];

const DescriptionComponent = () => {
  return (
    <Descriptions
      title="Responsive Descriptions"
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
