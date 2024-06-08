import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, handleLogout } = useContext(AuthContext);

  return (
    <header className="header">
      <h1>Course Dashboard</h1>
      <nav>
        <Link className="link" to="/courses"><button className='logout-button'>Courses</button></Link>
        <Link className="link" to="/admin/upload"> <button className='logout-button'>Upload A Course</button></Link>
        {isAuthenticated ? (
          <>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"><button className='logout-button'>Login</button></Link>
            <Link to="/signup"><button className='logout-button'>Signup</button></Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
