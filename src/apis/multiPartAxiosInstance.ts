import axios from 'axios';
import { auth } from '@/firebase'; 

const multiPartAxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  headers: {
    'Content-Type': 'multipart/form-data',
    'ngrok-skip-browser-warning': true,
  },
});

// 요청 인터셉터를 사용하여 모든 요청에 토큰을 추가합니다.
multiPartAxiosInstance.interceptors.request.use(
  async (config) => {
    try {
      // 현재 로그인된 사용자의 ID 토큰을 가져옵니다.
      const token = await auth.currentUser?.getIdToken();
      console.log('ID Token:', token); // 토큰을 콘솔에 출력하여 확인
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

export default multiPartAxiosInstance;
