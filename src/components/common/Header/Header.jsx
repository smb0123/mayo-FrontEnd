'use client';

import classNames from 'classnames/bind';

import styles from '@/components/common/Header/Header.module.scss';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import getStoreInfo from '@/components/common/Header/apis/getStoreInfo';
import { useStoreId } from '@/store/useStoreId';

const cn = classNames.bind(styles);

export default function Header() {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const { storeId } = useStoreId();

  const { data } = useQuery({
    queryKey: ['storeStatus'],
    queryFn: () => getStoreInfo(storeId),
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options = {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Seoul',
        weekday: 'short',
      };

      const formattedDateTime = now
        // @ts-ignore
        .toLocaleString('ko-KR', options)
        .replace(/(\d{2})\/(\d{2})/, '$2.$1')
        .replace(' ', ' ');
      setCurrentDateTime(formattedDateTime);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className={cn('container')}>
      <div className={cn('businessStatusBox')}>
        <div className={cn('businessStatus', { open: data?.openState })}></div>
        <p>{data?.openState ? '영업중' : '영업전'}</p>
      </div>
      <p className={cn('date')}>{currentDateTime}</p>
    </header>
  );
}
