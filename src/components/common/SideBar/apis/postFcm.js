import axiosInstance from '@/apis/axiosInstance';

export default async function postFcm({ fcmToken }) {
  const { data } = await axiosInstance.post('fcm', {
    fcmToken: fcmToken,
  });
  return data;
}
