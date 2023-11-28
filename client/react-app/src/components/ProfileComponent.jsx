import React, { useEffect, useState } from 'react';
import SwitchComponent from './SwitchComponent';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProfileComponent = () => {
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

  return (
    <div className="profile-component">
      <div className="business-name">iSEE-CRM</div>
      <SwitchComponent />
      <div className="profile-picture">
        {profile.picture && <img src={profile.picture} alt="Profile" />}
      </div>
      <div className="profile-info">
        <div className="profile-name">{profile.name || ''}</div>
        <div className="profile-status">
          {profile.email || '你沒有提供信箱'}
        </div>
      </div>
      <div className="profile-actions">
        <Link to="/user/profile/info">
          <button className="info-button">Info</button>
        </Link>

        <Link to="/user/profile/card">
          <button className="card-button">Card</button>
        </Link>
      </div>
      <div className="profile-contents">{profile.history}</div>
    </div>
  );
};

export default ProfileComponent;
