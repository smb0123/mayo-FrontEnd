import axiosInstance from '@/apis/axiosInstance';

export default async function putStoreClose(id) {
  const { data } = await axiosInstance.put(`store/close?storeId=${id}`);
  return data;
}
