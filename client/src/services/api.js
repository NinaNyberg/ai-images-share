import axios from 'axios';

const api = axios.create({
  //   baseURL: process.env.REACT_APP_REST_API_URL,
  baseURL: 'http://localhost:8080/api/v1'
  //   withCredentials: true
});

export default api;
