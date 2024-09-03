import axiosInstance from '@/apis/axiosInstance';

export default async function putStoreOpen({ storeId, itemIdList, count }) {
  const { data } = await axiosInstance.put(`store/open?storeId=${storeId}`, {
    itemIdList: itemIdList,
    quantityList: count,
  });
  return data;
}
