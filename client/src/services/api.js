import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_REST_API_URL
  //   baseURL: 'http://localhost:8080/api/v1'
  //   withCredentials: true
});

export default api;
