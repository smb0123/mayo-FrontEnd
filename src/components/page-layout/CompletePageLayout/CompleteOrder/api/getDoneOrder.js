import axiosInstance from '@/apis/axiosInstance';

export default async function getDoneOrder(id, date, page, size) {
  const { data } = await axiosInstance.get(
    `reservations-end-slice-time?storeId=${id}&timeStamp=${date}&page=${page}&size=${size}`
  );
  return data;
}
