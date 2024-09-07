'use client';

import classNames from 'classnames/bind';

import styles from '@/components/page-layout/InProgressPageLayout/NewOrder/NewOrder.module.scss';
import Order from '@/components/common/Order/Order';
import getNewOrder from '@/components/common/Order/api/getNewOrder';
import { useQuery } from '@tanstack/react-query';
import { OrderContext } from '../InProgressPageLayout';
import { useContext, useEffect, useState } from 'react';
import { useStoreId } from '@/store/useStoreId';

const cn = classNames.bind(styles);

export default function NewOrder() {
  const { setOrderId, setOrderStatus } = useContext(OrderContext);
  const { storeId } = useStoreId();

  const { data } = useQuery({
    queryKey: ['newOrder'],
    queryFn: () => getNewOrder(storeId),
    enabled: !!storeId,
  });

  return (
    <div className={cn('container')}>
      <header className={cn('header')}>신규 {data?.length}건</header>
      <div className={cn('newDetailOrderBox')}>
        {data?.length > 0 ? (
          data.map((order, id) => (
            <Order
              key={id}
              menu={order.firstItemName}
              date={order.createdAt.seconds}
              id={order.reservationId}
              setOrderId={setOrderId}
              setOrderStatus={setOrderStatus}
              orderStatus="new"
            />
          ))
        ) : (
          <p className={cn('noNewOrder')}>신규주문건이 없습니다</p>
        )}
      </div>
    </div>
  );
}
