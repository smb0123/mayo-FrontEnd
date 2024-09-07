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
  const { storeId } = useStoreId();
  const alarmSound = new Audio('/mp3/alarm.mp3');

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

      eventSource.addEventListener('new-reservation', (event) => {
        let newNotification = event.data;
        let parsedData;
        alarmSound.play();
        // console.log(newNotification.split('Response')[1]);
        console.log(newNotification);
        newNotification = newNotification.split('Response')[1];
        try {
          parsedData = JSON.parse(newNotification);
        } catch (error) {
          console.log(error);
          return;
        }

        console.log(typeof parsedData);

        setNotifications((prevNotifications) => [...prevNotifications, parsedData]);
        lastEventId = event.lastEventId;
      });

      eventSource.onerror = (error) => {
        console.error('SSE error:', error);
        setError('연결에 실패했습니다. 재연결 중...');
        eventSource.close();
        setTimeout(connectSSE, 5000);
      };

      eventSource.onopen = () => {
        setError(null);
        console.log('SSE 연결 성공');
      };
    };

    connectSSE();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [storeId]);

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
