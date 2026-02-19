import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../services/api';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    // Get user from localStorage on mount
    const currentUser = authAPI.getCurrentUser();
    setUser(currentUser);
  }, [location]);

  const handleLogout = () => {
    authAPI.logout();
    navigate('/auth');
  };

  // Vertical navbar styles
  const navbarStyle = {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100vh',
    width: '250px',
    backgroundColor: '#6B21A8',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    padding: '1.5rem 0',
    boxShadow: '2px 0 4px rgba(0,0,0,0.1)',
    zIndex: 100,
  };

  const logoStyle = {
    padding: '0 1.5rem',
    marginBottom: '2rem',
    fontSize: '1.25rem',
    fontWeight: 'bold',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    paddingBottom: '1rem',
  };

  const navLinksStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    gap: '0.5rem',
    padding: '0 1rem',
  };

  const linkStyle = (isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.875rem 1rem',
    color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
    textDecoration: 'none',
    borderRadius: '8px',
    backgroundColor: isActive ? '#7C3AED' : 'transparent',
    transition: 'all 0.3s ease',
    fontSize: '0.95rem',
    fontWeight: isActive ? '600' : '400',
  });

  const profileSectionStyle = {
    padding: '1rem 1.5rem',
    borderTop: '1px solid rgba(255,255,255,0.1)',
    marginTop: 'auto',
  };

  const profileButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    width: '100%',
    padding: '0.75rem',
    backgroundColor: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const avatarStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#9333EA',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1rem',
  };

  const profileInfoStyle = {
    flex: 1,
    textAlign: 'left',
  };

  const profileNameStyle = {
    fontSize: '0.9rem',
    fontWeight: '600',
  };

  const profileRoleStyle = {
    fontSize: '0.75rem',
    opacity: 0.8,
    textTransform: 'capitalize',
  };

  const dropdownStyle = {
    position: 'absolute',
    bottom: '100%',
    left: '1rem',
    right: '1rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
    padding: '0.5rem',
    marginBottom: '0.5rem',
  };

  const dropdownItemStyle = {
    display: 'block',
    width: '100%',
    padding: '0.75rem 1rem',
    textAlign: 'left',
    backgroundColor: 'transparent',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    color: '#374151',
    fontSize: '0.9rem',
    transition: 'background-color 0.2s',
  };

  const logoutButtonStyle = {
    ...dropdownItemStyle,
    color: '#EF4444',
  };

  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  // Check if we're on admin or user page
  const isAdminPage = location.pathname === '/admin';
  const isUserPage = location.pathname === '/user';

  return (
    <nav style={navbarStyle}>
      <div style={logoStyle}>
        📚 Leave Management
      </div>

      <div style={navLinksStyle}>
        <Link to="/" style={linkStyle(location.pathname === '/')}>
          🏠 Home
        </Link>
        
        {user && user.role === 'admin' && (
          <Link to="/admin" style={linkStyle(isAdminPage)}>
            📋 Admin Dashboard
          </Link>
        )}
        
        {user && user.role === 'user' && (
          <Link to="/user" style={linkStyle(isUserPage)}>
            📝 My Leave Requests
          </Link>
        )}
      </div>

      <div style={profileSectionStyle}>
        <button 
          style={profileButtonStyle}
          onClick={() => setShowProfile(!showProfile)}
        >
          <div style={avatarStyle}>
            {user ? getInitials(user.name) : '?'}
          </div>
          <div style={profileInfoStyle}>
            <div style={profileNameStyle}>
              {user ? user.name : 'Guest'}
            </div>
            <div style={profileRoleStyle}>
              {user ? user.role : 'Not logged in'}
            </div>
          </div>
          <span>▼</span>
        </button>

        {showProfile && user && (
          <div style={dropdownStyle}>
            <div style={{padding: '0.5rem 0.75rem', borderBottom: '1px solid #E5E7EB', marginBottom: '0.5rem'}}>
              <p style={{fontSize: '0.85rem', color: '#6B7280', margin: 0}}>Signed in as</p>
              <p style={{fontSize: '0.9rem', fontWeight: '600', margin: '0.25rem 0 0 0'}}>{user.email}</p>
            </div>
            <button 
              style={dropdownItemStyle}
              onClick={() => {
                setShowProfile(false);
                // Could navigate to profile page
              }}
            >
              👤 View Profile
            </button>
            <button 
              style={logoutButtonStyle}
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </div>
        )}

        {!user && (
          <Link 
            to="/auth" 
            style={{...linkStyle(false), marginTop: '0.5rem', justifyContent: 'center'}}
          >
            🔑 Login / Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
