'use client';

import classNames from 'classnames/bind';

import styles from '@/components/page-layout/MainPageLayout/NewOrder/NewOrder.module.scss';
import Order from '@/components/common/Order/Order';
import getNewOrder from '@/components/common/Order/api/getNewOrder';
import { useQuery } from '@tanstack/react-query';
import { OrderContext } from '../MainPageLayout';
import { useContext } from 'react';

const cn = classNames.bind(styles);

export default function NewOrder() {
  const { setOrderId, setOrderStatus } = useContext(OrderContext);
  const test = 'VQtTGTCc13EWulU5sZmI';
  const { data } = useQuery({
    queryKey: ['newOrder'],
    queryFn: () => getNewOrder(test),
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
