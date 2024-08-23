import axios from 'axios';

const multiPartAxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  headers: {
    'Content-Type': 'multipart/form-data',
    'ngrok-skip-browser-warning': true,
  },
});

export default multiPartAxiosInstance;
