import React from 'react';
import '../friend/Friend.css'


const AllUserCard = ({ user, index }) => {
    return (
      <div className="mb-[5px]">
      <div className="friend-task">
        <div className="profile">
          <div className="profile-img">{index + 1}</div>
  
          <div className="profile-text">
            <span className="friend-name">{user.firstName}</span>
            <span className="money">{user.earnings} BW</span>
          </div>
        </div>
  
        <div className="date">
          <span className="date-text">{user.date}</span>
          <span className="clock-text">{user.referralCount} referrals</span>
        </div>
      </div>
      </div>
    );
  };
  


  export default AllUserCard;