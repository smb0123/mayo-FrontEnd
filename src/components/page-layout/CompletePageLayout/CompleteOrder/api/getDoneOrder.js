import axiosInstance from '@/apis/axiosInstance';

export default async function getDoneOrder(id, date, page, size) {
  const formatDate = date + 'T00:00:00';
  const { data } = await axiosInstance.get(
    `reservations-end-slice-time?storeId=${id}&timeStamp=${formatDate}&page=${page}&size=${size}`
  );
  return data;
}
