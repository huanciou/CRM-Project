import React from 'react';
import { Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';

// const items = [
//   {
//     key: '1',
//     label: 'Info',
//   },
//   {
//     key: '2',
//     label: 'Cards',
//   },
// ];

const TabsComponents = ({ items, presentKey }) => {
  const navigate = useNavigate();

  const onChange = (key) => {
    if (key === '1') navigate('/user/profile/info');
    else if (key === '2') navigate('/user/profile/card');
    else if (key === '3') navigate('/user/profile/credits');
    else if (key === '4') navigate('/user/profile/history');
  };

  return (
    <Tabs
      defaultActiveKey={presentKey}
      items={items}
      size={'large'}
      onChange={onChange}
      indicatorSize={(origin) => origin - 10}
      tabBarGutter={240}
    />
  );
};

export default TabsComponents;
