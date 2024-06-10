// src/components/UserProfile.js
import React from 'react';
import { useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';

const UserProfile = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const username = useSelector((state) => state.auth.signupCredentials.name);

  return (
    <div className={`user-profile ${isAuthenticated ? 'visible' : 'hidden'}`}>
      {isAuthenticated && (
        <h2>
          <span className="user-icon"><FaUser /> {username}</span>
        </h2>
      )}
    </div>
  );
};

export default UserProfile;
