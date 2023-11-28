import React from 'react';
import SwitchComponent from './SwitchComponent';
import { Link } from 'react-router-dom';

const ProfileComponent = () => {
  return (
    <div className="profile-component">
      <div className="business-name">iSEE-CRM</div>
      <SwitchComponent />
      <div className="profile-picture"></div>
      <div className="profile-info">
        <div className="profile-name">Morty C-132</div>
        <div className="profile-status">EMAIL</div>
      </div>
      <div className="profile-actions">
        <Link to="/user/profile/info">
          <button className="info-button">Info</button>
        </Link>

        <Link to="/user/profile/card">
          <button className="card-button">Card</button>
        </Link>
      </div>
      <div className="profile-contents"></div>
    </div>
  );
};

export default ProfileComponent;
