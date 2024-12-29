import axiosInstance from '@/apis/axiosInstance';

export default async function postFcm({ token, fcmToken }) {
  const { data } = await axiosInstance.post(
    'fcm',
    {
      fcmToken: fcmToken,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
}
