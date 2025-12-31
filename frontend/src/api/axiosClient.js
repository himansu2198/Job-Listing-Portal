import axios from 'axios';
import { toast } from 'react-toastify';

// Create axios instance with default config
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosClient.interceptors.response.use(
  (response) => {
    // ✅ FIXED: Return response.data (your backend sends data in this format)
    return response.data;
  },
  (error) => {
    // Handle common errors
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - token expired or invalid
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.location.href = '/login';
          toast.error('Session expired. Please login again.');
          break;
        
        case 403:
          // Forbidden - insufficient permissions
          toast.error(data?.message || 'You do not have permission to access this resource.');
          break;
        
        case 404:
          // Not found
          toast.error(data?.message || 'Resource not found.');
          break;
        
        case 400:
          // Bad request (e.g., already applied)
          toast.error(data?.message || 'Bad request.');
          break;
        
        case 422:
          // Validation error
          const validationErrors = data.errors || data.message;
          if (Array.isArray(validationErrors)) {
            validationErrors.forEach(err => toast.error(err.msg || err));
          } else {
            toast.error(validationErrors);
          }
          break;
        
        case 500:
          // Server error
          toast.error(data?.message || 'Server error. Please try again later.');
          break;
        
        default:
          toast.error(data?.message || 'An error occurred');
      }
    } else if (error.request) {
      // Network error
      toast.error('Network error. Please check your connection.');
    } else {
      toast.error('An unexpected error occurred.');
    }
    
    return Promise.reject(error);
  }
);

export default axiosClient;