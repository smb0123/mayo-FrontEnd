'use client';

import classNames from 'classnames/bind';

import styles from '@/components/page-layout/InProgressPageLayout/NewOrder/NewOrder.module.scss';
import Order from '@/components/common/Order/Order';
import getNewOrder from '@/components/common/Order/api/getNewOrder';
import { useQuery } from '@tanstack/react-query';
import { OrderContext } from '../InProgressPageLayout';
import { useContext, useEffect, useState } from 'react';
import useStoreId from '@/store/useStoreId';

const cn = classNames.bind(styles);

export default function NewOrder() {
  const { setOrderId, setOrderStatus } = useContext(OrderContext);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { storeId } = useStoreId();
  const { data } = useQuery({
    queryKey: ['newOrder'],
    queryFn: () => getNewOrder(storeId),
    enabled: !!storeId,
  });

  useEffect(() => {
    let eventSource;
    let lastEventId = '';

    const connectSSE = () => {
      eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_BASE_URL}sse/reservations-new?storeId=${storeId}`);

      eventSource.addEventListener('notification', (event) => {
        const newNotification = event.data;
        let parsedData;

        try {
          parsedData = JSON.parse(newNotification);
        } catch (error) {
          return;
        }

        setNotifications((prevNotifications) => [...prevNotifications, parsedData]);
        lastEventId = event.lastEventId;
      });

      eventSource.onerror = (error) => {
        console.error('SSE error:', error);
        setError('연결에 실패했습니다. 재연결 중...');
        setIsConnected(false);
        eventSource.close();
        setTimeout(connectSSE, 5000); // 5초 후 재연결 시도
      };

      eventSource.onopen = () => {
        setError(null);
        setIsConnected(true);
        console.log('SSE 연결 성공');
      };
    };

    connectSSE(); // SSE 연결 시도

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [storeId]);
  console.log(notifications);

  return (
    <div className={cn('container')}>
      <header className={cn('header')}>신규 {data?.length}건</header>
      <div>{notifications}</div>
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
