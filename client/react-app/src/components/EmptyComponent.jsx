import React from 'react';
import { Empty } from 'antd';

const EmptyComponent = ({ imageStyle = {} }) => {
  return <Empty description={<span>暫無數據</span>} imageStyle={imageStyle} />;
};

export default EmptyComponent;
