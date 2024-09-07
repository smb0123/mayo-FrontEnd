import classNames from 'classnames/bind';

import styles from '@/components/page-layout/CompletePageLayout/CompleteOrder/CompleteOrder.module.scss';
import Order from '@/components/common/Order/Order';
import { useContext, useEffect, useState } from 'react';
import { CompleteOrderContext } from '../CompletePageLayout';
import getDoneOrder from './api/getDoneOrder';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import useStoreId from '@/store/useStoreId';
import CalendarCustom from './CalendarCustom/CalendarCustom';

const cn = classNames.bind(styles);

export default function CompleteOrder() {
  const { setOrderId } = useContext(CompleteOrderContext);
  const { storeId } = useStoreId();

  const [isDateButtonClick, setIsDateButtonClick] = useState(false);
  const [date, setDate] = useState();
  const [nowDate, setNowDate] = useState(null);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['doneOrder'],
    queryFn: () => getDoneOrder(storeId, nowDate),
    enabled: !!nowDate,
  });

  const handleDateButtonClick = () => {
    setIsDateButtonClick((prev) => !prev);
  };

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setIsDateButtonClick((prev) => !prev);
    // @ts-ignore
    setNowDate(moment(selectedDate).format('YYYY-MM-DD'));
  };

  useEffect(() => {
    if (nowDate) {
      queryClient.invalidateQueries({ queryKey: ['doneOrder'] });
    }
  }, [nowDate, queryClient]);

  return (
    <div className={cn('container')}>
      <header className={cn('headerBox')}>
        <p className={cn('header')}>완료 {data?.length}건</p>
        <p className={cn('nowDate')}>{nowDate}</p>
        <button onClick={handleDateButtonClick} className={cn('dateButton')}>
          날짜 선택
        </button>
        {isDateButtonClick && <CalendarCustom onChange={handleDateChange} value={date} />}
      </header>
      <div className={cn('completeDetailOrderBox')}>
        {data ? (
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
