import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://fakestoreapi.in/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;