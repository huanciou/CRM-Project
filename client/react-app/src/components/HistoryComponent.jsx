import React, { useEffect, useState } from 'react';
import SwitchComponent from './SwitchComponent';
import Cookies from 'js-cookie';
import CollapseComponents from './CollapseComponents';
import TabsComponents from './TabsComponents';
import '../styles/style.css';

const HistoryComponent = () => {
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const jwtToken = Cookies.get('jwtToken');
      const dbToken = Cookies.get('dbToken');

      // ${window.location.origin}

      if (jwtToken) {
        try {
          const response = await fetch(
            `${window.location.origin}/api/1.0/user/fetchHistory`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${jwtToken}`,
                dbToken,
              },
            },
          );
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
    <div className="profile-component">
      {/* <div className="business-name">{name}</div> */}
      <SwitchComponent />

      {/* <div className="profile-actions">
        <Link to="/user/profile/credits">
          <button className="info-button">Credits</button>
        </Link>

        <Link to="/user/profile/history">
          <button className="card-button">History</button>
        </Link>
      </div> */}
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
        ]}
        presentKey={'4'}
      />

      <CollapseComponents historyList={historyList} />
    </div>
  );
};

export default HistoryComponent;
