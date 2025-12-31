import axiosClient from './axiosClient';

export const authApi = {
  // Register a new user
  register: (userData) => {
    return axiosClient.post('/auth/register', userData);
  },

  // Login user
  login: (credentials) => {
    return axiosClient.post('/auth/login', credentials);
  },

  // Get current user
  getCurrentUser: () => {
    return axiosClient.get('/auth/me');
  },

  // Update user profile
  updateProfile: (userData) => {
    return axiosClient.put('/auth/profile', userData);
  },

  // Change password
  changePassword: (passwords) => {
    return axiosClient.put('/auth/change-password', passwords);
  },

  // Forgot password
  forgotPassword: (email) => {
    return axiosClient.post('/auth/forgot-password', { email });
  },

  // Reset password
  resetPassword: (data) => {
    return axiosClient.post('/auth/reset-password', data);
  },

  // Logout
  logout: () => {
    return axiosClient.post('/auth/logout');
  }
};