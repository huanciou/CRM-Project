import React from 'react';
import { Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';

const TabsComponents = ({ items, presentKey }) => {
  const navigate = useNavigate();

  const onChange = (key) => {
    if (key === '1') navigate('/user/profile/info');
    else if (key === '2') navigate('/user/profile/card');
    else if (key === '3') navigate('/user/profile/credits');
    else if (key === '4') navigate('/user/profile/history');
    else if (key === '5') navigate('/user/profile/comments');
  };

  return (
    <Tabs
      defaultActiveKey={presentKey}
      items={items}
      size={'large'}
      onChange={onChange}
      indicatorSize={(origin) => origin - 10}
      tabBarGutter={60}
    />
  );
};

export default TabsComponents;
