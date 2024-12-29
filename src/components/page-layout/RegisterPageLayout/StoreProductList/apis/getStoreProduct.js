import axiosInstance from '@/apis/axiosInstance';

export default async function getStoreProduct() {
  const { data } = await axiosInstance.get(`item-store`);
  return data;
}
