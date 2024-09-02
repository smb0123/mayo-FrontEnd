import axiosInstance from '@/apis/axiosInstance';

export default async function putOrderDone(id) {
  const { data } = await axiosInstance.put(`reservation-done?reservationId=${id}`);
  return data;
}
