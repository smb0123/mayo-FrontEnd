import axios from 'axios';

const multiPartAxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  headers: {
    'Content-Type': 'multipart/form-data',
    'ngrok-skip-browser-warning': true,
  },
});

multiPartAxiosInstance.interceptors.request.use(
  async (config) => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('토큰을 가져오는 중 오류 발생:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default multiPartAxiosInstance;
