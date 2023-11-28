import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SwitchComponent from './SwitchComponent';
import Cookies from 'js-cookie';

const CardComponent = () => {
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

  const [cards, setCards] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const fetchMemberCards = async () => {
      try {
        const response = await fetch(
          `${window.location.origin}/api/1.0/user/profile/card`,
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const cardImages = await response.json();
        console.log(cardImages);
        setCards(cardImages);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchMemberCards();
  }, []);

  const handlePrev = () => {
    setActiveCardIndex(
      (prevIndex) => (prevIndex - 1 + cards.length) % cards.length,
    );
  };

  const handleNext = () => {
    setActiveCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

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
      <div className="profile-contents">
        <div className="card-component">
          {cards.length > 0 ? (
            <div className="card-container">
              <button className="arrow left-arrow" onClick={handlePrev}>
                &lt;
              </button>
              <div
                className="card"
                style={{ backgroundImage: `url(${cards[activeCardIndex]})` }} // 修改这里
              >
                {/* 卡片内容 */}
              </div>
              <button className="arrow right-arrow" onClick={handleNext}>
                &gt;
              </button>
            </div>
          ) : (
            <div className="card-container empty">你还没有会员卡哟</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
