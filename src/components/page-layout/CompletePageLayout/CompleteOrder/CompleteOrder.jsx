import classNames from 'classnames/bind';

import styles from '@/components/page-layout/CompletePageLayout/CompleteOrder/CompleteOrder.module.scss';
import Order from '@/components/common/Order/Order';
import { useContext, useEffect, useState } from 'react';
import { CompleteOrderContext } from '../CompletePageLayout';
import getDoneOrder from './api/getDoneOrder';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import useStoreId from '@/store/useStoreId';

const cn = classNames.bind(styles);

export default function CompleteOrder() {
  const { setOrderId } = useContext(CompleteOrderContext);
  const { storeId } = useStoreId();

  const orderArray = [];
  const [isDateButtonClick, setIsDateButtonClick] = useState(false);
  const [date, setDate] = useState();
  const [nowDate, setNowDate] = useState(null);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['doneOrder'],
    queryFn: () => getDoneOrder(storeId, nowDate),
    enabled: !!nowDate,
  });

  data?.pages.map((order) => order.content.map((detailOrder) => orderArray.push(detailOrder)));

  const handleDateButtonClick = () => {
    setIsDateButtonClick((prev) => !prev);
  };

  const handleDateChange = (selectedDate) => {
    queryClient.invalidateQueries({ queryKey: ['doneOrder'] });

    setDate(selectedDate);
    setIsDateButtonClick((prev) => !prev);
    // @ts-ignore
    setNowDate(moment(selectedDate).format('YYYY-MM-DD'));
  };

  return (
    <div className={cn('container')}>
      <header className={cn('headerBox')}>
        <p className={cn('header')}>완료 {orderArray.length}건</p>
        <p className={cn('nowDate')}>{nowDate}</p>
        <button onClick={handleDateButtonClick} className={cn('dateButton')}>
          날짜 선택
        </button>
        {isDateButtonClick && <Calendar className={cn('calendar')} onChange={handleDateChange} value={date}></Calendar>}
      </header>
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
      </div>
    </div>
  );
}
