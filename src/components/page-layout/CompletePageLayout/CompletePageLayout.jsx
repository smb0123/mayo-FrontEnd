'use client';

import classNames from 'classnames/bind';

import styles from '@/components/page-layout/CompletePageLayout/CompletePageLayout.module.scss';
import { createContext, useState } from 'react';
import CompleteOrder from './CompleteOrder/CompleteOrder';
import CompleteDetailOrder from './CompleteDetailOrder/CompleteDetailOrder';

const cn = classNames.bind(styles);

export const CompleteOrderContext = createContext();

export default function CompletePageLayout() {
  const [orderId, setOrderId] = useState(true);

  return (
    <CompleteOrderContext.Provider value={{ orderId, setOrderId }}>
      <div className={cn('container')}>
        <CompleteOrder />
        <CompleteDetailOrder />
      </div>
    </CompleteOrderContext.Provider>
  );
}
