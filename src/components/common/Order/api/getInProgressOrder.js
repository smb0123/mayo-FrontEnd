import axiosInstance from '@/apis/axiosInstance';

export default async function getInProgressOrder(id) {
  const { data } = await axiosInstance.get(`reservation-done-async?storeId=${id}`);
  return data;
}
