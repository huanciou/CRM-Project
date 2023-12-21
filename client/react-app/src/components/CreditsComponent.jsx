import React, { useEffect, useState } from 'react';
import SwitchComponent from './SwitchComponent';
import Cookies from 'js-cookie';
import EmptyComponent from './EmptyComponent';
import TabsComponents from './TabsComponents';
import AutoModalComponent from './AutoModalComponent';
import '../styles/style.css';

const CreditsComponent = () => {
  useEffect(() => {
    document.title = 'Credits';
  }, []);

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
    <div style={{ backgroundColor: 'rgba(21, 21, 21,0.9)' }}>
      <div className="profile-component">
        <div className="business-name">{name}</div>
        <SwitchComponent />
        <div className="profile-picture">
          {(profile.picture && <img src={profile.picture} alt="Profile" />) || (
            <EmptyComponent />
          )}
        </div>
        <div className="profile-info">
          <div className="profile-name">{profile.name || ''}</div>
          <div className="profile-status">{profile.email || ''}</div>
        </div>
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
          presentKey={'3'}
        />
        <div className="autoModal">
          <AutoModalComponent credits={credits.credits} name={profile.name} />
        </div>
      </div>
    </div>
  );
};

export default CreditsComponent;
