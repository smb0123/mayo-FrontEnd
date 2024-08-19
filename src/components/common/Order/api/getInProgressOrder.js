import axiosInstance from '@/apis/axiosInstance';

export default async function getInProgressOrder(id) {
  const { data } = await axiosInstance.get(`reservation-proceed-async?storeId=${id}`);
  return data;
}
