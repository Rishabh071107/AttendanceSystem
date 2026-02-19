import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Home = () => {
  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#F5F3FF',
    fontFamily: 'Arial, sans-serif',
    marginLeft: '250px', // Account for vertical navbar
  };

  const heroStyle = {
    textAlign: 'center',
    padding: '4rem 2rem',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const titleStyle = {
    fontSize: '3rem',
    color: '#6B21A8',
    marginBottom: '1rem',
    fontWeight: 'bold',
  };

  const subtitleStyle = {
    fontSize: '1.25rem',
    color: '#4B5563',
    marginBottom: '3rem',
    lineHeight: '1.6',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '1.5rem',
    justifyContent: 'center',
    flexWrap: 'wrap',
  };

  const buttonStyle = {
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    fontWeight: '600',
    borderRadius: '8px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: 'none',
  };

  const loginButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#6B21A8',
    color: 'white',
  };

  const signupButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'white',
    color: '#6B21A8',
    border: '2px solid #6B21A8',
  };

  const featureContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '3rem',
    padding: '0 2rem',
    maxWidth: '1000px',
    margin: '3rem auto 0',
  };

  const featureCardStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    textAlign: 'left',
  };

  const featureTitleStyle = {
    fontSize: '1.25rem',
    color: '#6B21A8',
    marginBottom: '0.75rem',
    fontWeight: 'bold',
  };

  const featureTextStyle = {
    color: '#6B7280',
    lineHeight: '1.6',
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={heroStyle}>
        <h1 style={titleStyle}>Leave Management System</h1>
        <p style={subtitleStyle}>
          Welcome to the Leave Management System. Manage your leave requests efficiently 
          or approve/decline requests as an administrator.
        </p>
        <div style={buttonContainerStyle}>
          <Link to="/auth" style={loginButtonStyle}>
            Login / Sign Up
          </Link>
        </div>
      </div>

      <div style={featureContainerStyle}>
        <div style={featureCardStyle}>
          <h3 style={featureTitleStyle}>🎓 For Students</h3>
          <p style={featureTextStyle}>
            Submit leave requests, track application status, and manage your leave history easily.
          </p>
        </div>
        <div style={featureCardStyle}>
          <h3 style={featureTitleStyle}>👨‍🏫 For Faculty</h3>
          <p style={featureTextStyle}>
            Review and manage student leave requests, approve or reject applications, and view statistics.
          </p>
        </div>
        <div style={featureCardStyle}>
          <h3 style={featureTitleStyle}>📱 Easy to Use</h3>
          <p style={featureTextStyle}>
            Simple and intuitive interface for seamless leave management experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
