import classNames from 'classnames/bind';

import styles from '@/components/page-layout/CompletePageLayout/CompleteOrder/CompleteOrder.module.scss';
import Order from '@/components/common/Order/Order';
import { useContext } from 'react';
import { CompleteOrderContext } from '../CompletePageLayout';

const cn = classNames.bind(styles);

const data = [
  {
    firstItemName: '짬떡',
    createdAt: {
      seconds: 1723374554,
    },
    reservationId: 's',
  },
  {
    firstItemName: '짬떡',
    createdAt: {
      seconds: 1723374554,
    },
    reservationId: 's',
  },
];

export default function CompleteOrder() {
  const { setOrderId } = useContext(CompleteOrderContext);

  return (
    <div className={cn('container')}>
      <header className={cn('header')}>완료 {data?.length}건</header>
      <div className={cn('completeDetailOrderBox')}>
        {data?.length > 0 ? (
          data.map((order, idx) => (
            <Order
              key={idx}
              menu={order.firstItemName}
              date={order.createdAt.seconds}
              id={order.reservationId}
              orderStatus="new"
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
