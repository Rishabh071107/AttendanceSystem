import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { leaveAPI } from '../services/api';

const UserHomepage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch user's leave requests on mount
  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const fetchLeaveRequests = async () => {
    try {
      setLoading(true);
      const data = await leaveAPI.getMyLeaveRequests();
      if (Array.isArray(data)) {
        setLeaveRequests(data);
      }
    } catch (err) {
      setError('Failed to load leave requests');
    } finally {
      setLoading(false);
    }
  };

  const [formData, setFormData] = useState({
    from_date: '',
    to_date: '',
    leave_type: '',
    description: ''
  });

  const handleApplyClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setFormData({
      from_date: '',
      to_date: '',
      leave_type: '',
      description: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await leaveAPI.applyLeave(formData);
      
      // Refresh the leave requests list
      await fetchLeaveRequests();
      
      handleClosePopup();
      alert('Leave application submitted successfully!');
    } catch (err) {
      alert('Failed to submit leave application');
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#F5F3FF',
    fontFamily: 'Arial, sans-serif',
    marginLeft: '250px',
  };

  const contentStyle = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const headerStyle = {
    fontSize: '2rem',
    color: '#6B21A8',
    marginBottom: '2rem',
    fontWeight: 'bold',
  };

  const applyButtonStyle = {
    padding: '1rem 2rem',
    backgroundColor: '#6B21A8',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    marginBottom: '2rem',
    transition: 'background-color 0.3s'
  };

  const tableStyle = {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  };

  const thStyle = {
    backgroundColor: '#6B21A8',
    color: 'white',
    padding: '1rem',
    textAlign: 'left',
    fontWeight: '600'
  };

  const tdStyle = {
    padding: '1rem',
    borderBottom: '1px solid #E5E7EB',
    color: '#374151'
  };

  const statusStyle = (status) => ({
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '600',
    backgroundColor: status === 'Approved' ? '#D1FAE5' : 
                     status === 'Rejected' ? '#FEE2E2' : '#FEF3C7',
    color: status === 'Approved' ? '#065F46' : 
           status === 'Rejected' ? '#991B1B' : '#92400E'
  });

  // Popup styles
  const popupOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  };

  const popupContentStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    width: '90%',
    maxWidth: '500px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const popupHeaderStyle = {
    fontSize: '1.5rem',
    color: '#6B21A8',
    marginBottom: '1.5rem',
    fontWeight: 'bold'
  };

  const formGroupStyle = {
    marginBottom: '1rem'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#374151',
    fontWeight: '600'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #D1D5DB',
    borderRadius: '6px',
    fontSize: '1rem',
    boxSizing: 'border-box'
  };

  const selectStyle = {
    ...inputStyle,
    cursor: 'pointer'
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: '100px',
    resize: 'vertical'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem'
  };

  const submitButtonStyle = {
    flex: 1,
    padding: '0.75rem',
    backgroundColor: '#6B21A8',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'background-color 0.3s'
  };

  const cancelButtonStyle = {
    flex: 1,
    padding: '0.75rem',
    backgroundColor: '#9CA3AF',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '600',
    transition: 'background-color 0.3s'
  };

  const loadingStyle = {
    textAlign: 'center',
    padding: '3rem',
    color: '#6B7280',
    fontSize: '1.1rem',
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={contentStyle}>
        <h1 style={headerStyle}>My Leave Requests</h1>
        
        <button style={applyButtonStyle} onClick={handleApplyClick}>
          + Apply for Leave
        </button>
        
        {loading ? (
          <div style={loadingStyle}>Loading your leave requests...</div>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>From Date</th>
                <th style={thStyle}>To Date</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{...tdStyle, textAlign: 'center', padding: '2rem'}}>
                    No leave requests yet. Click "Apply for Leave" to submit a request.
                  </td>
                </tr>
              ) : (
                leaveRequests.map((request) => (
                  <tr key={request.id}>
                    <td style={tdStyle}>{request.from_date}</td>
                    <td style={tdStyle}>{request.to_date}</td>
                    <td style={tdStyle}>{request.leave_type}</td>
                    <td style={tdStyle}>{request.description}</td>
                    <td style={tdStyle}>
                      <span style={statusStyle(request.status)}>
                        {request.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div style={popupOverlayStyle} onClick={handleClosePopup}>
          <div style={popupContentStyle} onClick={(e) => e.stopPropagation()}>
            <h2 style={popupHeaderStyle}>Apply for Leave</h2>
            <form onSubmit={handleSubmit}>
              <div style={formGroupStyle}>
                <label style={labelStyle}>From Date</label>
                <input
                  type="date"
                  name="from_date"
                  value={formData.from_date}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>To Date</label>
                <input
                  type="date"
                  name="to_date"
                  value={formData.to_date}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Type of Leave</label>
                <select
                  name="leave_type"
                  value={formData.leave_type}
                  onChange={handleInputChange}
                  style={selectStyle}
                  required
                >
                  <option value="">Select Leave Type</option>
                  <option value="Casual Leave">Casual Leave</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Personal Leave">Personal Leave</option>
                  <option value="Emergency Leave">Emergency Leave</option>
                  <option value="Study Leave">Study Leave</option>
                </select>
              </div>

              <div style={formGroupStyle}>
                <label style={labelStyle}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  style={textareaStyle}
                  placeholder="Enter reason for leave..."
                  required
                />
              </div>

              <div style={buttonContainerStyle}>
                <button
                  type="button"
                  style={cancelButtonStyle}
                  onClick={handleClosePopup}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={submitButtonStyle}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHomepage;
