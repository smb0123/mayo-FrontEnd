import axiosInstance from '@/apis/axiosInstance';

export default async function getStoreProduct(id) {
  const { data } = await axiosInstance.get(`item-store?storeId=${id}`);
  return data;
}
