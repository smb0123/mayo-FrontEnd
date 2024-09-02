import axiosInstance from '@/apis/axiosInstance';

export default async function putOrderAccept(id) {
  const { data } = await axiosInstance.put(`reservation-accept?reservationId=${id}`);
  return data;
}
