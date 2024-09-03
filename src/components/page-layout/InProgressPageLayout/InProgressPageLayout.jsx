'use client';

import classNames from 'classnames/bind';

import styles from '@/components/page-layout/InProgressPageLayout/InProgressPageLayout.module.scss';
import NewOrder from '@/components/page-layout/InProgressPageLayout/NewOrder/NewOrder';
import InProgressOrder from '@/components/page-layout/InProgressPageLayout/InProgressOrder/InProgressOrder';
import DetailOrder from '@/components/page-layout/InProgressPageLayout/DetailOrder/DetailOrder';
import { createContext, useState } from 'react';

const cn = classNames.bind(styles);

const defaultValue = {
  orderId: null,
  setOrderId: null,
  orderStatus: null,
  setOrderStatus: null,
};

export const OrderContext = createContext(defaultValue);

export default function MainPageLayout() {
  const [orderId, setOrderId] = useState(null);
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
