import React from 'react';
import { Collapse, theme } from 'antd';
import DescriptionComponent from './DescriptionComponent';
import '../styles/style.css';

const CollapseComponents = ({ historyList }) => {
  const { token } = theme.useToken();
  const items = historyList.map((item, index) => ({
    key: String(index),
    label: item.checkout_Time,
    children: <DescriptionComponent item={item} />,
  }));

  return (
    <Collapse
      accordion
      size={'large'}
      items={items}
      style={{ background: token.volcano1 }}
    />
  );
};

export default CollapseComponents;
