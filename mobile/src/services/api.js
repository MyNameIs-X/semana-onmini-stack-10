import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.141.68:4000/'
});

export default api;