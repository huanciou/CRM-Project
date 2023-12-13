import React from 'react';
import { Collapse } from 'antd';
import DescriptionComponent from './DescriptionComponent';
import '../styles/style.css';

// const items = [
//   {
//     key: '1',
//     label: {historyList._id},
//     children: <DescriptionComponent />,
//   },
//   {
//     key: '2',
//     label: 'This is panel header 2',
//     children: <DescriptionComponent />,
//   },
//   {
//     key: '3',
//     label: 'This is panel header 3',
//     children: <DescriptionComponent />,
//   },
// ];

const CollapseComponents = ({ historyList }) => {
  const items = historyList.map((item, index) => ({
    key: String(index),
    label: item.checkout_Time,
    children: <DescriptionComponent item={item} />,
  }));

  return <Collapse accordion size={'large'} items={items} />;
};

export default CollapseComponents;
