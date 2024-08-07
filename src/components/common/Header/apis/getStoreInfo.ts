import axiosInstance from '@/apis/axiosInstance';

export default async function getStoreInfo(id) {
  const { data } = await axiosInstance.get(`stores?storeId=${id}`);
  return data;
}
