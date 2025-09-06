import axios from 'axios';

const api = axios.create({
 // baseURL: 'http://localhost:5001/api',
  baseURL: 'https://profileproject-sb7b.onrender.com/api',
  withCredentials: true,
});

export default api;