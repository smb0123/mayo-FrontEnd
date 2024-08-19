'use client';

import classNames from 'classnames/bind';

import styles from '@/components/page-layout/RegisterPageLayout/StoreProductList/StoreProductList.module.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import getStoreProduct from './apis/getStoreProduct';
import StoreProduct from '@/components/common/StoreProduct/StoreProduct';
import putStoreOpen from './apis/putStoreOpen';
import { useEffect, useState } from 'react';
import putStoreClose from './apis/putStoreClose';

const cn = classNames.bind(styles);

export default function StoreProductList() {
  const storeId = 'VQtTGTCc13EWulU5sZmI';
  const [count, setCount] = useState([]);

  const { data } = useQuery({
    queryKey: ['StoreProductList', storeId],
    queryFn: () => getStoreProduct(storeId),
  });

  console.log(data);

  const itemIdList = data?.map((product) => product.itemId);

  const quantityList = data?.map((product) => Number(product.itemQuantity)) || [];

  const queryClient = useQueryClient();

  const storeOpenMutation = useMutation({
    mutationFn: ({ storeId, itemIdList, count }) => putStoreOpen({ storeId, itemIdList, count }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['StoreProductList', storeId] });
      queryClient.invalidateQueries({ queryKey: ['storeStatus'] });
    },
  });

  const storeClosetMutation = useMutation({
    mutationFn: (storeId) => putStoreClose(storeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['StoreProductList', storeId] });
      queryClient.invalidateQueries({ queryKey: ['storeStatus'] });
    },
  });

  const handleOpenClick = () => {
    storeOpenMutation.mutate({ storeId, itemIdList, count });
  };

  const handleCloseClick = () => {
    storeClosetMutation.mutate(storeId);
  };

  useEffect(() => {
    setCount(quantityList);
  }, [data]);

  return (
    <div className={cn('container')}>
      {data?.map((product, idx) => (
        <StoreProduct setCount={setCount} order={idx} count={count} key={product.itemId} title={product.itemName} />
      ))}
      <div className={cn('buttonBox')}>
        <button onClick={handleOpenClick} className={cn('button')}>
          오픈하기
        </button>
        <button onClick={handleCloseClick} className={cn('button')}>
          마감하기
        </button>
      </div>
    </div>
  );
}
