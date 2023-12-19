import React from 'react';
import { Avatar, Space } from 'antd';
const AvatarComponent = ({ profileData }) => {
  const avatarLetter = profileData.name ? profileData.name[0] : '？';
  return (
    <Space
      size={16}
      wrap
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Avatar
        style={{
          backgroundColor: '#fde3cf',
          color: '#f56a00',
          margin: 'auto',
          fontSize: '40px',
        }}
        size={80}
      >
        {avatarLetter}
      </Avatar>
    </Space>
  );
};
export default AvatarComponent;
