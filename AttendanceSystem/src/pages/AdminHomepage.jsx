import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { adminAPI, authAPI } from '../services/api';

const AdminHomepage = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statistics, setStatistics] = useState(null);

  // Fetch leave requests and statistics on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch all leave requests
      const requestsData = await adminAPI.getAllLeaveRequests();
      if (Array.isArray(requestsData)) {
        setLeaveRequests(requestsData);
      }
      
      // Fetch statistics
      const statsData = await adminAPI.getStatistics();
      if (statsData) {
        setStatistics(statsData);
      }
    } catch (err) {
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      await adminAPI.approveLeaveRequest(id);
      // Update local state
      setLeaveRequests(leaveRequests.map(request =>
        request.id === id ? { ...request, status: 'Approved' } : request
      ));
    } catch (err) {
      alert('Failed to approve request');
    }
  };

  const handleReject = async (id) => {
    try {
      await adminAPI.rejectLeaveRequest(id);
      // Update local state
      setLeaveRequests(leaveRequests.map(request =>
        request.id === id ? { ...request, status: 'Rejected' } : request
      ));
    } catch (err) {
      alert('Failed to reject request');
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#F5F3FF',
    fontFamily: 'Arial, sans-serif',
    marginLeft: '250px', // Account for vertical navbar
  };

  const contentStyle = {
    padding: '2rem',
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const headerStyle = {
    fontSize: '2rem',
    color: '#6B21A8',
    marginBottom: '2rem',
    fontWeight: 'bold',
  };

  const statsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  };

  const statCardStyle = {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const statNumberStyle = {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#6B21A8',
  };

  const statLabelStyle = {
    fontSize: '0.9rem',
    color: '#6B7280',
    marginTop: '0.5rem',
  };

  const tableStyle = {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  const thStyle = {
    backgroundColor: '#6B21A8',
    color: 'white',
    padding: '1rem',
    textAlign: 'left',
    fontWeight: '600',
  };

  const tdStyle = {
    padding: '1rem',
    borderBottom: '1px solid #E5E7EB',
    color: '#374151',
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '0.5rem',
  };

  const approveButtonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#10B981',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s',
  };

  const rejectButtonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s',
  };

  const statusStyle = (status) => ({
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '600',
    backgroundColor: status === 'Approved' ? '#D1FAE5' : 
                     status === 'Rejected' ? '#FEE2E2' : '#FEF3C7',
    color: status === 'Approved' ? '#065F46' : 
           status === 'Rejected' ? '#991B1B' : '#92400E',
  });

  const loadingStyle = {
    textAlign: 'center',
    padding: '3rem',
    color: '#6B7280',
    fontSize: '1.1rem',
  };

  const errorStyle = {
    textAlign: 'center',
    padding: '2rem',
    color: '#EF4444',
    backgroundColor: '#FEE2E2',
    borderRadius: '8px',
    marginBottom: '1rem',
  };

  return (
    <div style={containerStyle}>
      <Navbar />
      <div style={contentStyle}>
        <h1 style={headerStyle}>Admin Dashboard - Leave Requests</h1>

        {error && <div style={errorStyle}>{error}</div>}

        {/* Statistics Cards */}
        <div style={statsContainerStyle}>
          <div style={statCardStyle}>
            <div style={statNumberStyle}>{leaveRequests.length}</div>
            <div style={statLabelStyle}>Total Requests</div>
          </div>
          <div style={statCardStyle}>
            <div style={statNumberStyle}>
              {leaveRequests.filter(r => r.status === 'Pending').length}
            </div>
            <div style={statLabelStyle}>Pending</div>
          </div>
          <div style={statCardStyle}>
            <div style={statNumberStyle}>
              {leaveRequests.filter(r => r.status === 'Approved').length}
            </div>
            <div style={statLabelStyle}>Approved</div>
          </div>
          <div style={statCardStyle}>
            <div style={statNumberStyle}>
              {leaveRequests.filter(r => r.status === 'Rejected').length}
            </div>
            <div style={statLabelStyle}>Rejected</div>
          </div>
        </div>

        {loading ? (
          <div style={loadingStyle}>Loading leave requests...</div>
        ) : (
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Student Name</th>
                <th style={thStyle}>Student ID</th>
                <th style={thStyle}>From Date</th>
                <th style={thStyle}>To Date</th>
                <th style={thStyle}>Type</th>
                <th style={thStyle}>Description</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.length === 0 ? (
                <tr>
                  <td colSpan="8" style={{...tdStyle, textAlign: 'center', padding: '2rem'}}>
                    No leave requests found
                  </td>
                </tr>
              ) : (
                leaveRequests.map((request) => (
                  <tr key={request.id}>
                    <td style={tdStyle}>{request.user?.name || 'Unknown'}</td>
                    <td style={tdStyle}>{request.user?.student_id || 'N/A'}</td>
                    <td style={tdStyle}>{request.from_date}</td>
                    <td style={tdStyle}>{request.to_date}</td>
                    <td style={tdStyle}>{request.leave_type}</td>
                    <td style={tdStyle}>{request.description}</td>
                    <td style={tdStyle}>
                      <span style={statusStyle(request.status)}>
                        {request.status}
                      </span>
                    </td>
                    <td style={tdStyle}>
                      {request.status === 'Pending' && (
                        <div style={buttonContainerStyle}>
                          <button
                            style={approveButtonStyle}
                            onClick={() => handleApprove(request.id)}
                          >
                            Approve
                          </button>
                          <button
                            style={rejectButtonStyle}
                            onClick={() => handleReject(request.id)}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminHomepage;
