import axiosInstance from '@/apis/axiosInstance';

export default async function getInProgressOrder(id) {
  const { data } = await axiosInstance.get(`reservation-proceed?storeId=${id}`);
  return data;
}
