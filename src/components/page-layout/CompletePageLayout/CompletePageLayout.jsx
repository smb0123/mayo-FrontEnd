'use client';

import classNames from 'classnames/bind';

import styles from '@/components/page-layout/CompletePageLayout/CompletePageLayout.module.scss';
import { createContext, useState } from 'react';
import CompleteOrder from './CompleteOrder/CompleteOrder';
import CompleteDetailOrder from './CompleteDetailOrder/CompleteDetailOrder';

const cn = classNames.bind(styles);

const defaultValue = {
  orderId: null,
  setOrderId: null,
};

export const CompleteOrderContext = createContext(defaultValue);

export default function CompletePageLayout() {
  const [orderId, setOrderId] = useState(null);

  return (
    <CompleteOrderContext.Provider value={{ orderId, setOrderId }}>
      <div className={cn('container')}>
        <CompleteOrder />
        <CompleteDetailOrder />
      </div>
    </CompleteOrderContext.Provider>
  );
}
