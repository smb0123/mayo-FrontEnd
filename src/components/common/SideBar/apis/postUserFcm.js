import axiosInstance from '@/apis/axiosInstance';

export default async function postUserFcm(storeId) {
  const { data } = await axiosInstance.post(`reservation-new/fcm?storeId=${storeId}`, {});
  return data;
}
