import React, { useEffect, useState } from 'react';
import SwitchComponent from './SwitchComponent';
import Cookies from 'js-cookie';
import CollapseComponents from './CollapseComponents';
import TabsComponents from './TabsComponents';
import '../styles/style.css';

const HistoryComponent = () => {
  useEffect(() => {
    document.title = 'History';
  }, []);

  const [historyList, setHistoryList] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      const jwtToken = Cookies.get('jwtToken');
      const dbToken = Cookies.get('dbToken');

      if (jwtToken) {
        try {
          const response = await fetch(`${apiUrl}/api/1.0/user/fetchHistory`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              dbToken,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setHistoryList(data);
          } else {
            throw new Error('Profile fetch failed');
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchProfile();
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
          presentKey={'4'}
        />

        <CollapseComponents historyList={historyList} />
      </div>
    </div>
  );
};

export default HistoryComponent;
