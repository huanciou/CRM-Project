import React, { useEffect, useState } from 'react';
import SwitchComponent from './SwitchComponent';
import Cookies from 'js-cookie';
import TabsComponents from './TabsComponents';
import ModalComponent from './ModalComponent';
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
      <TabsComponents
        items={[
          {
            key: '1',
            label: 'Info',
          },
          {
            key: '2',
            label: 'Cards',
          },
        ]}
        presentKey={'1'}
      />
      <div className="modal">
        <ModalComponent id={profile.id} />
      </div>
      {/* <div className="profile-contents"></div> */}
    </div>
  );
};

export default ProfileComponent;
