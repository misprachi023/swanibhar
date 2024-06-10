import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <h1>Course Dashboard</h1>
      <div className={`menu-icon ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>
      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <Link className="link" to="/courses">
          <button className="logout-button">Courses</button>
        </Link>
        <Link className="link" to="/admin/upload">
          <button className="logout-button">Upload A Course</button>
        </Link>
        {isAuthenticated ? (
          <>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              <button className="logout-button">Login</button>
            </Link>
            <Link to="/signup">
              <button className="logout-button">Signup</button>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
