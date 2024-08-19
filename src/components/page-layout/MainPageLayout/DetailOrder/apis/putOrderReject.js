import axiosInstance from '@/apis/axiosInstance';

export default async function putOrderReject(id) {
  const { data } = await axiosInstance.put(`reservation-fail?reservationId=${id}`);
  return data;
}
