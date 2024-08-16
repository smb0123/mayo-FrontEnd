'use client';

import classNames from 'classnames/bind';

import styles from '@/components/page-layout/MainPageLayout/MainPageLayout.module.scss';
import NewOrder from '@/components/page-layout/MainPageLayout/NewOrder/NewOrder';
import InProgressOrder from '@/components/page-layout/MainPageLayout/InProgressOrder/InProgressOrder';
import DetailOrder from '@/components/page-layout/MainPageLayout/DetailOrder/DetailOrder';
import { createContext, useState } from 'react';

const cn = classNames.bind(styles);

export const OrderContext = createContext();

export default function MainPageLayout() {
  const [orderId, setOrderId] = useState(true);
  const [orderStatus, setOrderStatus] = useState(null);

  return (
    <OrderContext.Provider value={{ orderId, setOrderId, orderStatus, setOrderStatus }}>
      <div className={cn('container')}>
        <div className={cn('orderBox')}>
          <NewOrder />
          <InProgressOrder />
        </div>
        <DetailOrder />
      </div>
    </OrderContext.Provider>
  );
}
