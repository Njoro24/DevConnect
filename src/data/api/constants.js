// config/api.js or utils/api.js
const API_BASE_URL = 'http://127.0.0.1:5000';

export const API_ENDPOINTS = {
  // Auth endpoints
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  LOGOUT: `${API_BASE_URL}/api/auth/logout`,
  REFRESH_TOKEN: `${API_BASE_URL}/api/auth/refresh`,
  
  // Other endpoints
  PROFILE: `${API_BASE_URL}/api/user/profile`,
  // Add more as needed
};
