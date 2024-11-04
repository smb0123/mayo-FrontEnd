import axiosInstance from '@/apis/axiosInstance';

export default async function getNewOrder(id) {
  const { data } = await axiosInstance.get(`reservation-new?storeId=${id}`);
  return data;
}
