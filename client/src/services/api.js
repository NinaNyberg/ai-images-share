import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL
  //   withCredentials: true
});

export default api;
