import axiosInstance from '@/apis/axiosInstance';

export default async function postUserFcm(userId, storeId) {
  const { data } = await axiosInstance.post(`reservation-new/fcm?storeId=${storeId}&userId=${userId}`);
  return data;
}
