const BASE_URL = 'http://localhost:5000/api';

// Helper function to get token
const getToken = () => localStorage.getItem('token');
const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Auth API
export const authAPI = {
  // Login
  login: async (email, password) => {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  // Register (Student)
  register: async (userData) => {
    const response = await fetch(`${BASE_URL}/user/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  // Register Admin (Faculty)
  registerAdmin: async (adminData) => {
    const response = await fetch(`${BASE_URL}/user/register-admin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(adminData),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Get current user
  getCurrentUser: getUser,

  // Check if logged in
  isLoggedIn: () => !!getToken(),
};

// Leave API
export const leaveAPI = {
  // Get user's leave requests
  getMyLeaveRequests: async () => {
    const response = await fetch(`${BASE_URL}/user/leave-requests`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.json();
  },

  // Apply for leave
  applyLeave: async (leaveData) => {
    const response = await fetch(`${BASE_URL}/user/leave`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(leaveData),
    });
    return response.json();
  },

  // Cancel leave request
  cancelLeaveRequest: async (id) => {
    const response = await fetch(`${BASE_URL}/user/leave-requests/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.json();
  },

  // Get user profile
  getProfile: async () => {
    const response = await fetch(`${BASE_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.json();
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await fetch(`${BASE_URL}/user/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(profileData),
    });
    return response.json();
  },
};

// Admin API
export const adminAPI = {
  // Get all leave requests
  getAllLeaveRequests: async () => {
    const response = await fetch(`${BASE_URL}/admin/leave-requests`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.json();
  },

  // Approve leave request
  approveLeaveRequest: async (id) => {
    const response = await fetch(`${BASE_URL}/admin/leave-requests/${id}/approve`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.json();
  },

  // Reject leave request
  rejectLeaveRequest: async (id) => {
    const response = await fetch(`${BASE_URL}/admin/leave-requests/${id}/reject`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.json();
  },

  // Get all users
  getAllUsers: async () => {
    const response = await fetch(`${BASE_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.json();
  },

  // Get statistics
  getStatistics: async () => {
    const response = await fetch(`${BASE_URL}/admin/statistics`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.json();
  },
};
