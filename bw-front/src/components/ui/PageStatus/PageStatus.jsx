import './PageStatus.css'

import React from 'react';
import PropTypes from 'prop-types';


const UIStatus = ({ balance, friends, user }) => {


  return (
    <div className="status">
      <div className="profile">
        <img className="profile-image" src={user.profileImage} alt="profile" />
        <span className="username">{user.firstName}</span>
      </div>

      {(balance || friends) && (
        <div className="counter">
          {balance && (
            <span className="balance gap-[9px]">
              {user.balance}
              <b className="balance-unit">BW</b>
            </span>
          )}

          {friends && <span className="friends-count">{friends} BW</span>}
        </div>
      )}
    </div>
  );
};

UIStatus.propTypes = {
  balance: PropTypes.bool,
  friends: PropTypes.number,
  user: PropTypes.object
};

export default UIStatus;
