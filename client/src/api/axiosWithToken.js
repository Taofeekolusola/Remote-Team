// src/api/axiosWithToken.js
import axios from 'axios';

const axiosWithToken = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: 'http://localhost:5005/api',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export default axiosWithToken;