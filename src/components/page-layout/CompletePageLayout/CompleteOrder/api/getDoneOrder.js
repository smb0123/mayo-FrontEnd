import axiosInstance from '@/apis/axiosInstance';

export default async function getDoneOrder(id, date) {
  const formatDate = date + 'T00:00:00';
  const { data } = await axiosInstance.get(`reservation-done-time?storeId=${id}&timestamp=${formatDate}`);
  return data;
}
