import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.terrence.io',
  headers: {
    'Content-Type': 'application/json',
    timeout: 10000,
  },
  withCredentials: true,
});

export default api;
