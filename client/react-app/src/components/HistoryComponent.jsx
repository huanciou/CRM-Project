import React, { useEffect, useState } from 'react';
import SwitchComponent from './SwitchComponent';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const HistoryComponent = () => {
  const [profile, setProfile] = useState({
    name: '',
    picture: '',
    history: '',
    email: '',
  });

  const [history, setHistory] = useState(Array(5).fill(''));
  const [name, setName] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const jwtToken = Cookies.get('jwtToken');
      const dbToken = Cookies.get('dbToken');
      setName(dbToken);

      if (jwtToken) {
        try {
          const response = await fetch(
            `${window.location.origin}/api/1.0/user/profile`,
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
            setProfile({
              name: data.name,
              picture: data.picture,
              history: data.history,
              email: data.email,
            });
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

  useEffect(() => {
    const fetchHistory = async () => {
      const jwtToken = Cookies.get('jwtToken');
      const dbToken = Cookies.get('dbToken');

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
            setHistory(data);
          } else {
            throw new Error('Profile fetch failed');
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="profile-component">
      <div className="business-name">{name}</div>
      <SwitchComponent />
      <div className="profile-picture">
        {profile.picture && <img src={profile.picture} alt="Profile" />}
      </div>
      <div className="profile-info">
        <div className="profile-name">{profile.name || 'Null'}</div>
        <div className="profile-status">{profile.email || 'Null'}</div>
      </div>
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
      <div className="history-contents">
        <p className="history"> {history[4]}</p>
        <p className="history"> {history[3]}</p>
        <p className="history"> {history[2]}</p>
        <div className="history"> {history[1]}</div>
        <div className="history"> {history[0]}</div>
      </div>
    </div>
  );
};

export default HistoryComponent;
