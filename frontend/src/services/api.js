import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
});

// Add a request interceptor to attach the auth token
API.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    const { token } = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
