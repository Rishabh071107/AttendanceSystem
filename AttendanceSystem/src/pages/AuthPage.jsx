import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

// Special PIN for faculty/admin registration (stored in frontend as requested)
const FACULTY_PIN = 'FACULTY2024';

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [userType, setUserType] = useState('student'); // 'student' or 'faculty'
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinVerified, setPinVerified] = useState(false);
  const [pinInput, setPinInput] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    student_id: '',
    employee_id: '',
    department: '',
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      student_id: '',
      employee_id: '',
      department: '',
    });
    setError('');
  };

  // Handle user type change (Student/Faculty)
  const handleUserTypeChange = (type) => {
    if (type === 'faculty' && !isLogin) {
      setShowPinModal(true);
      return;
    }
    setUserType(type);
    setPinVerified(false);
    resetForm();
  };

  // Verify PIN
  const verifyPin = () => {
    if (pinInput === FACULTY_PIN) {
      setPinVerified(true);
      setShowPinModal(false);
      setUserType('faculty');
      alert('PIN verified! You can now register as Faculty.');
    } else {
      alert('Invalid PIN! Only authorized faculty can register.');
      setPinInput('');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        // Login
        const result = await authAPI.login(formData.email, formData.password);
        if (result.token) {
          const user = result.user;
          if (user.role === 'admin') {
            navigate('/admin');
          } else {
            navigate('/user');
          }
        } else {
          setError(result.message || 'Login failed');
        }
      } else {
        // Register
        if (userType === 'faculty') {
          // Admin registration
          const result = await authAPI.registerAdmin({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            employee_id: formData.employee_id,
            department: formData.department,
          });
          if (result.token) {
            navigate('/admin');
          } else {
            setError(result.message || 'Registration failed');
          }
        } else {
          // Student registration
          const result = await authAPI.register({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            student_id: formData.student_id,
            department: formData.department,
          });
          if (result.token) {
            navigate('/user');
          } else {
            setError(result.message || 'Registration failed');
          }
        }
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Styles
  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F3FF',
    fontFamily: 'Arial, sans-serif',
    padding: '1rem',
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '450px',
  };

  const titleStyle = {
    fontSize: '2rem',
    color: '#6B21A8',
    marginBottom: '0.5rem',
    textAlign: 'center',
    fontWeight: 'bold',
  };

  const subtitleStyle = {
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: '1.5rem',
  };

  const toggleContainerStyle = {
    display: 'flex',
    gap: '0.5rem',
    marginBottom: '1.5rem',
    backgroundColor: '#F3F4F6',
    padding: '0.25rem',
    borderRadius: '8px',
  };

  const toggleButtonStyle = {
    flex: 1,
    padding: '0.75rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '600',
    backgroundColor: 'transparent',
    color: '#6B7280',
    transition: 'all 0.3s',
  };

  const toggleActiveStyle = {
    ...toggleButtonStyle,
    backgroundColor: '#6B21A8',
    color: 'white',
  };

  const formGroupStyle = {
    marginBottom: '1rem',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#374151',
    fontWeight: '600',
    fontSize: '0.9rem',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    fontSize: '1rem',
    boxSizing: 'border-box',
  };

  const submitButtonStyle = {
    width: '100%',
    padding: '0.875rem',
    backgroundColor: '#6B21A8',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: loading ? 'not-allowed' : 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    marginTop: '1rem',
    opacity: loading ? 0.7 : 1,
  };

  const errorStyle = {
    color: '#EF4444',
    fontSize: '0.875rem',
    marginTop: '0.5rem',
    textAlign: 'center',
  };

  const switchTextStyle = {
    textAlign: 'center',
    marginTop: '1.5rem',
    color: '#6B7280',
  };

  const switchLinkStyle = {
    color: '#6B21A8',
    cursor: 'pointer',
    fontWeight: '600',
    textDecoration: 'underline',
  };

  const backButtonStyle = {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: 'transparent',
    color: '#6B21A8',
    border: '1px solid #6B21A8',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '600',
    marginTop: '1rem',
  };

  const pinModalStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  };

  const pinModalContentStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '350px',
    textAlign: 'center',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        <p style={subtitleStyle}>
          {isLogin 
            ? 'Login to your account' 
            : userType === 'faculty' 
              ? 'Register as Faculty' 
              : 'Register as Student'
          }
        </p>

        {/* User Type Toggle (only for signup) */}
        {!isLogin && (
          <>
            <div style={toggleContainerStyle}>
              <button 
                style={userType === 'student' ? toggleActiveStyle : toggleButtonStyle}
                onClick={() => handleUserTypeChange('student')}
              >
                I'm a Student
              </button>
              <button 
                style={userType === 'faculty' ? toggleActiveStyle : toggleButtonStyle}
                onClick={() => handleUserTypeChange('faculty')}
              >
                I'm Faculty
              </button>
            </div>

            {/* Show PIN requirement message for faculty */}
            {userType === 'faculty' && !pinVerified && (
              <p style={{textAlign: 'center', color: '#92400E', fontSize: '0.85rem', marginBottom: '1rem'}}>
                🔐 Faculty registration requires special PIN
              </p>
            )}
          </>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name field (only for registration) */}
          {!isLogin && (
            <div style={formGroupStyle}>
              <label style={labelStyle}>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Enter your full name"
                required={!isLogin}
              />
            </div>
          )}

          {/* Email field */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password field */}
          <div style={formGroupStyle}>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Student ID (only for student registration) */}
          {!isLogin && userType === 'student' && (
            <div style={formGroupStyle}>
              <label style={labelStyle}>Student ID</label>
              <input
                type="text"
                name="student_id"
                value={formData.student_id}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Enter your student ID"
                required={!isLogin && userType === 'student'}
              />
            </div>
          )}

          {/* Employee ID (only for faculty registration) */}
          {!isLogin && userType === 'faculty' && pinVerified && (
            <div style={formGroupStyle}>
              <label style={labelStyle}>Employee ID</label>
              <input
                type="text"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Enter your employee ID"
                required={!isLogin && userType === 'faculty'}
              />
            </div>
          )}

          {/* Department (for both registrations) */}
          {!isLogin && (
            <div style={formGroupStyle}>
              <label style={labelStyle}>Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                style={inputStyle}
                placeholder="Enter your department"
                required={!isLogin}
              />
            </div>
          )}

          {error && <p style={errorStyle}>{error}</p>}

          <button type="submit" style={submitButtonStyle} disabled={loading}>
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p style={switchTextStyle}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span 
            style={switchLinkStyle} 
            onClick={() => {setIsLogin(!isLogin); resetForm();}}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </span>
        </p>

        <button style={backButtonStyle} onClick={() => navigate('/')}>
          ← Back to Home
        </button>
      </div>

      {/* PIN Modal */}
      {showPinModal && (
        <div style={pinModalStyle}>
          <div style={pinModalContentStyle}>
            <h2 style={{color: '#6B21A8', marginBottom: '1rem'}}>Faculty Verification</h2>
            <p style={{color: '#6B7280', marginBottom: '1rem'}}>
              Please enter the special PIN to register as Faculty
            </p>
            <input
              type="password"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              style={{...inputStyle, marginBottom: '1rem'}}
              placeholder="Enter PIN"
            />
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <button 
                onClick={() => {setShowPinModal(false); setUserType('student');}}
                style={{...backButtonStyle, marginTop: 0}}
              >
                Cancel
              </button>
              <button 
                onClick={verifyPin}
                style={{...submitButtonStyle, marginTop: 0}}
              >
                Verify PIN
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
