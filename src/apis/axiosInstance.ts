import axios from 'axios';
import { auth } from '@/firebase';

const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': true,
  },
});

// 요청 인터셉터를 사용하여 모든 요청에 토큰을 추가합니다.
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // 현재 로그인된 사용자의 ID 토큰을 가져옵니다.
      const token = await auth.currentUser?.getIdToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰을 추가합니다.
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

export default axiosInstance;
