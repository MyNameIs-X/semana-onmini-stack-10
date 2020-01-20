import Vue from 'vue';
import axios from 'axios';


const instace = axios.create({
  baseURL: 'http://localhost:4000',
  auth: false,
  headers: {
    'Content-Type': 'application/json',
  }
});

Vue.axios = instace;
export default instace;