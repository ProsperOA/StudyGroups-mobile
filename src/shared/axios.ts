import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.7:8080/api/v1'
});

axiosInstance.interceptors.request.use(
  config => {
    console.log(config);
    return config;
  },
  err => {
    console.log(err);
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    console.log(response);
    return response;
  },
  err => {
    console.log(err);
    return Promise.reject(err);
  }
);

export default axiosInstance;
