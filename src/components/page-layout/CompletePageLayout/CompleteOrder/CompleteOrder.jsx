import classNames from 'classnames/bind';

import styles from '@/components/page-layout/CompletePageLayout/CompleteOrder/CompleteOrder.module.scss';
import Order from '@/components/common/Order/Order';
import { useContext, useEffect } from 'react';
import { CompleteOrderContext } from '../CompletePageLayout';
import getDoneOrder from './api/getDoneOrder';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

const cn = classNames.bind(styles);

export default function CompleteOrder() {
  const { setOrderId } = useContext(CompleteOrderContext);
  const test = 'VQtTGTCc13EWulU5sZmI';
  const date = '2024-08-19T12:00:00Z';
  const [lastRef, inView] = useInView();
  const orderArray = [];

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['doneOrder'],
    queryFn: ({ pageParam }) => getDoneOrder(test, date, pageParam, 8),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) =>
      !lastPage.last ? lastPage.pageable.pageNumber + 1 : undefined,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  data?.pages.map((order) => order.content.map((detailOrder) => orderArray.push(detailOrder)));

  return (
    <div className={cn('container')}>
      <header className={cn('header')}>완료 {data?.content?.length}건</header>
      <div className={cn('completeDetailOrderBox')}>
        {orderArray ? (
          orderArray?.map((order, idx) => (
            <Order
              key={idx}
              menu={order.firstItemName}
              date={order.createdAt.seconds}
              id={order.id}
              orderStatus="done"
              setOrderId={setOrderId}
              setOrderStatus={false}
            />
          ))
        ) : (
          <p className={cn('noCompleteOrder')}>완료 건이 없습니다</p>
        )}
        {data && <div ref={lastRef}></div>}
      </div>
    </div>
  );
}
