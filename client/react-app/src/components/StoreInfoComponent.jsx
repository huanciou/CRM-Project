import React, { useEffect, useState } from 'react';
import SwitchComponent from './SwitchComponent';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import '../styles/style.css';

const StoreInfoComponent = () => {
  const [profile, setProfile] = useState({
    name: '',
    picture: '',
    history: '',
    email: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const jwtToken = Cookies.get('jwtToken');

      if (jwtToken) {
        try {
          const response = await fetch(
            `${window.location.origin}/api/1.0/user/profile`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${jwtToken}`,
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
    const fetchInfo = async () => {
      const jwtToken = Cookies.get('jwtToken');

      if (jwtToken) {
        try {
          const response = await fetch(
            `${window.location.origin}/api/1.0/user/profile`,
            {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${jwtToken}`,
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

    fetchInfo();
  }, []);

  return (
    <div className="profile-component">
      <div className="business-name">iSEE-CRM</div>
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

        <Link to="/user/profile/StoreInfo">
          <button className="info-button">Info</button>
        </Link>
      </div>
      <div className="profile-contents">{profile.history}</div>
    </div>
  );
};

export default StoreInfoComponent;
