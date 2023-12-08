import React, { useEffect, useState } from 'react';
import SwitchComponent from './SwitchComponent';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const CreditsComponent = () => {
  const [profile, setProfile] = useState({
    name: '',
    picture: '',
    history: '',
    email: '',
  });

  const [credits, setCredits] = useState({
    credits: 0,
  });

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
    const fetchCredits = async () => {
      const jwtToken = Cookies.get('jwtToken');
      const dbToken = Cookies.get('dbToken');

      if (jwtToken) {
        try {
          const response = await fetch(
            `${window.location.origin}/api/1.0/user/fetchCredits`,
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
            setCredits({
              credits: data,
            });
          } else {
            throw new Error('Profile fetch failed');
          }
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      }
    };

    fetchCredits();
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
      <div className="profile-contents">
        <div className="credits">累積點數：{credits.credits}</div>
      </div>
    </div>
  );
};

export default CreditsComponent;
