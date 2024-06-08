import React from 'react';
import { FaUser } from 'react-icons/fa';

const UserProfile = ({ isLoggedIn, username }) => {
  return (
    <div className={`user-profile ${isLoggedIn ? 'visible' : 'hidden'}`}>
      {isLoggedIn && (
        <h2>
          {/* Display user icon */}
          <span className="user-icon"><FaUser /> {username}</span> 
        </h2>
      )}
    </div>
  );
};

export default UserProfile;
