import React, { useState, useEffect } from 'react';
import SwitchComponent from './SwitchComponent';
import CarouselComponent from './CarouselComponent';
import TabsComponents from './TabsComponents';
import Cookies from 'js-cookie';
import '../styles/style.css';

const CardComponent = () => {
  const [profile, setProfile] = useState({
    id: '',
    name: '',
    picture: '',
    history: '',
    email: '',
  });

  const [name, setName] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const jwtToken = Cookies.get('jwtToken');
    const dbToken = Cookies.get('dbToken');
    setName(dbToken);
    const fetchProfile = async () => {
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

  // ${window.location.origin}
  useEffect(() => {
    const jwtToken = Cookies.get('jwtToken');
    const dbToken = Cookies.get('dbToken');
    setName(dbToken);
    const fetchMemberCards = async () => {
      try {
        const response = await fetch(
          `${window.location.origin}/api/1.0/user/profile/card`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              dbToken,
            },
          },
        );
        const cardsInfo = await response.json();
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setCards(cardsInfo);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchMemberCards();
  }, []);

  return (
    <div className="profile-component">
      <div className="business-name">{name}</div>
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
      {/* <div className="profile-actions">
        <Link to="/user/profile/info">
          <button className="info-button">Info</button>
        </Link>

        <Link to="/user/profile/card">
          <button className="card-button">Card</button>
        </Link>
      </div> */}
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
        presentKey={'2'}
      />
      <div className="profile-contents">
        <CarouselComponent cards={cards} />
      </div>
    </div>
  );
};

export default CardComponent;
