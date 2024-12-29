import axiosInstance from '@/apis/axiosInstance';

export default async function postUserFcm(token, storeId) {
  const { data } = await axiosInstance.post(
    `reservation-new/fcm?storeId=${storeId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data;
}
