'use client';

import classNames from 'classnames/bind';

import styles from '@/components/page-layout/InProgressPageLayout/InProgressPageLayout.module.scss';
import NewOrder from '@/components/page-layout/InProgressPageLayout/NewOrder/NewOrder';
import InProgressOrder from '@/components/page-layout/InProgressPageLayout/InProgressOrder/InProgressOrder';
import DetailOrder from '@/components/page-layout/InProgressPageLayout/DetailOrder/DetailOrder';
import { createContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import ROUTE from '@/constants/route';

const cn = classNames.bind(styles);

const defaultValue = {
  orderId: null,
  setOrderId: null,
  orderStatus: null,
  setOrderStatus: null,
};

export const OrderContext = createContext(defaultValue);

export default function MainPageLayout() {
  const router = useRouter();
  const [orderId, setOrderId] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storeId = localStorage.getItem('storeId');

    if (!token) {
      alert('로그인 정보가 없습니다. 다시 로그인해주세요');
      return router.push(ROUTE.HOME);
    }

    if (!storeId) {
      alert('가게 정보가 없습니다. 다시 로그인해주세요');
      return router.push(ROUTE.HOME);
    }
  }, [router]);

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
