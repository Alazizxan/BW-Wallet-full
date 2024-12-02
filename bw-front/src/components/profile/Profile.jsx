import './Profile.css';

import React from 'react';

const Profile = ({ profileImage, user }) => {
  return (
    <div className="profile-container">
      <img 
        className="avatar" 
        src={profileImage} 
        alt="profile" 
      />
      <span className="nickname">{user.firstName}</span>
      <span className="account-balance">
        {user.balance || 0}
        <b className="currency">BW</b>
      </span>
    </div>
  );
};

export default Profile;
