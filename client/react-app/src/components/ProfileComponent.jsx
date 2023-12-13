import React, { useEffect, useState } from 'react';
import SwitchComponent from './SwitchComponent';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import DescriptionComponent from './DescriptionComponent';
import QRCodeComponent from './QRCodeComponent';
import '../styles/style.css';

const ProfileComponent = () => {
  const [profile, setProfile] = useState({
    id: '',
    name: '',
    picture: '',
    email: '',
  });

  const [name, setName] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const jwtToken = Cookies.get('jwtToken');
      const dbToken = Cookies.get('dbToken');
      setName(dbToken);

      // ${window.location.origin}
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
              id: data.id,
              name: data.name,
              picture: data.picture,
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
      <div className="business-name">{name || '456'}</div>
      <SwitchComponent />
      <div className="profile-picture">
        {profile.picture && <img src={profile.picture} alt="Profile" />}
      </div>
      <div className="profile-info">
        <div className="profile-name">{profile.name || '123'}</div>
        <div className="profile-status">
          {profile.email || '你沒有提供信箱'}
        </div>
      </div>
      <QRCodeComponent id={profile.id} />
      <div className="profile-actions">
        <Link to="/user/profile/info">
          <button className="info-button">Info</button>
        </Link>

        <Link to="/user/profile/card">
          <button className="card-button">Card</button>
        </Link>
      </div>
      <div className="profile-contents">
        <DescriptionComponent />
      </div>
    </div>
  );
};

export default ProfileComponent;
