import classNames from 'classnames/bind';

import styles from '@/components/page-layout/CompletePageLayout/CompleteOrder/CompleteOrder.module.scss';
import Order from '@/components/common/Order/Order';
import { useContext } from 'react';
import { CompleteOrderContext } from '../CompletePageLayout';
import getDoneOrder from './api/getDoneOrder';
import { useQuery } from '@tanstack/react-query';

const cn = classNames.bind(styles);

export default function CompleteOrder() {
  const { setOrderId } = useContext(CompleteOrderContext);
  const test = 'VQtTGTCc13EWulU5sZmI';

  const { data } = useQuery({
    queryKey: ['doneOrder'],
    queryFn: () => getDoneOrder(test),
  });

  return (
    <div className={cn('container')}>
      <header className={cn('header')}>완료 {data?.length}건</header>
      <div className={cn('completeDetailOrderBox')}>
        {data?.length > 0 ? (
          data?.map((order, idx) => (
            <Order
              key={idx}
              menu={order.firstItemName}
              date={order.createdAt.seconds}
              id={order.reservationId}
              orderStatus="done"
              setOrderId={setOrderId}
              setOrderStatus={false}
            />
          ))
        ) : (
          <p className={cn('noCompleteOrder')}>완료 건이 없습니다</p>
        )}
      </div>
    </div>
  );
}
