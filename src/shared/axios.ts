import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.7:8080/api/v1'
});

export default axiosInstance;

