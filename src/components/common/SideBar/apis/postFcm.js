import axiosInstance from '@/apis/axiosInstance';

export default async function postFcm({ userId, fcmToken }) {
  const { data } = await axiosInstance.post('fcm', {
    userId: userId,
    fcmToken: fcmToken,
  });
  return data;
}
