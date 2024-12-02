import React from 'react';


const TopReferralCard = ({ user, index }) => {
    return (
      <div className="mb-[5px]">
  <div className="friend-task">
    <div className="profile">
      <div className="profile-index">{index + 1}</div>

      <div >
        <img className='profile-img2' src="\src\assets\images\top10.jpg" alt={`${user.firstName} profile`} />
      </div>

      <div className="profile-text">
        <span className="friend-name">{user.firstName}</span>
        
      </div>
      <div className='text-money'>
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
  


  export default TopReferralCard;