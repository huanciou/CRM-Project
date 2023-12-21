import React, { useEffect, useState } from 'react';
import SwitchComponent from './SwitchComponent';
import Cookies from 'js-cookie';
import TabsComponents from './TabsComponents';
import ScrollCommentsComponent from './ScrollCommentsComponent';
import '../styles/style.css';

const CommentsPage = () => {
  useEffect(() => {
    document.title = 'Comments';
  }, []);

  return (
    <div style={{ backgroundColor: 'rgba(21, 21, 21,0.9)' }}>
      <div className="profile-component">
        <SwitchComponent />
        <TabsComponents
          items={[
            {
              key: '3',
              label: 'Credits',
            },
            {
              key: '4',
              label: 'History',
            },
            {
              key: '5',
              label: 'Comments',
            },
          ]}
          presentKey={'5'}
        />
        <div style={{ maxWidth: 380, maxHeight: 600 }}>
          <ScrollCommentsComponent />
        </div>
      </div>
    </div>
  );
};

export default CommentsPage;
