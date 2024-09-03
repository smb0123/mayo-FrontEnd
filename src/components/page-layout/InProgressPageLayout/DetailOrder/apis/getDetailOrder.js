import axiosInstance from '@/apis/axiosInstance';

export default async function getDetailOrder(id) {
  const { data } = await axiosInstance.get(`reservation-detail?reservationId=${id}`);
  return data;
}
