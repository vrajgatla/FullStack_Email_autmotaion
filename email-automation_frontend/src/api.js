import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  // You can add common headers here if needed
});

// Add a request interceptor to attach the JWT token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    // console.log('Interceptor token:', token); // Debug log
    if (token) {
      console.log("Interceptor token: [HIDDEN] (length:", token.length, ")");
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      console.log("Interceptor token: null");
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api; 