import React from 'react';
import './Friend.css';
import profileImage from '../../assets/images/friend-profile.svg';

function Friend({ profileImage, friendName, money, date, clock }) {
  return (
    <div className="friend-task">
      <div className="profile">
        <img className="profile-img" src={profileImage} alt="profile" />

        <div className="profile-text">
          <span className="friend-name">{friendName}</span>
          <span className="money">{money} BW</span>
        </div>
      </div>

      <div className="date">
        <span className="date-text">{date}</span>
        <span className="clock-text">{clock}</span>
      </div>
    </div>
  );
}

export default Friend;