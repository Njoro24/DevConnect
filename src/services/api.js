// src/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.DEV
  ? '/api'
  : import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  throw new Error('API base URL is not defined. Check your .env file.');
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token automatically to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Jobs API
export const jobAPI = {
  getAllJobs: () => api.get('/jobs'),
  getJobById: (id) => api.get(`/jobs/${id}`),
  createJob: (jobData) => api.post('/jobs', jobData),
  updateJob: (id, jobData) => api.put(`/jobs/${id}`, jobData),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
};

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/login', credentials).then(res => res.data),
  register: (userData) => api.post('/register', userData).then(res => res.data),
  getProfile: (userId) => api.get(`/profile/${userId}`).then(res => res.data),
};

// User API
export const userAPI = {
  getAllUsers: () => api.get('/users'),
  getUserById: (id) => api.get(`/users/${id}`),
  createUser: (userData) => api.post('/users', userData),
};

export default api;
