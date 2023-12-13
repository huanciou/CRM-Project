import React, { useEffect, useState } from 'react';
import SwitchComponent from './SwitchComponent';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import CollapseComponents from './CollapseComponents';
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
      {/* <div className="profile-picture">
        {profile.picture && <img src={profile.picture} alt="Profile" />}
      </div> */}
      {/* <div className="profile-info">
        <div className="profile-name">{profile.name || 'Null'}</div>
        <div className="profile-status">{profile.email || 'Null'}</div>
      </div> */}
      <div className="profile-actions">
        <Link to="/user/profile/credits">
          <button className="info-button">Credits</button>
        </Link>

        <Link to="/user/profile/history">
          <button className="card-button">History</button>
        </Link>

        {/* <Link to="/user/profile/StoreInfo">
          <button className="info-button">Info</button>
        </Link> */}
      </div>
      {/* <div className="history-contents"> */}
      <CollapseComponents historyList={historyList} />
      {/* </div> */}
    </div>
  );
};

export default HistoryComponent;
