'use client';

import classNames from 'classnames/bind';

import styles from '@/components/common/SideBar/SideBar.module.scss';

import InProcess from '@/icons/in_process.svg';
import Complete from '@/icons/complete.svg';
import Register from '@/icons/register.svg';
import MyPage from '@/icons/my_page.svg';
import Logo from '@/icons/logo.svg';
import Link from 'next/link';
import ROUTE from '@/constants/route';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useStoreId, useUserId, useAlarm } from '@/store/useStoreId';
import Alarm from '@/icons/alarm.svg';
import AlarmOff from '@/icons/alarm_off.svg';

const cn = classNames.bind(styles);

export default function SideBar() {
  const alarmSoundRef = useRef(null);
  const [canPlaySound, setCanPlaySound] = useState(false);
  const pathName = usePathname();
  const { storeId } = useStoreId();
  const { userId } = useUserId();
  const { setAlarm } = useAlarm();
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    alarmSoundRef.current = new Audio('/mp3/alarm.mp3');
  }, []);

  useEffect(() => {
    let eventSource;

    const connectSSE = () => {
      if (retryCount >= 3) return;

      eventSource = new EventSource(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}sse/reservations-new?storeId=${storeId}&userId=${userId}`
      );

      eventSource.addEventListener('new-reservation', (event) => {
        let Notification = event.data;
        const newNotification = JSON.parse(Notification);

        if (canPlaySound) {
          alarmSoundRef.current.play().catch((error) => {
            console.log('알람 재생 오류:', error);
          });
        }

        setAlarm(newNotification);
      });

      eventSource.onerror = (error) => {
        console.error('SSE error:', error);
        eventSource.close();
        setTimeout(connectSSE, 5000);
        setRetryCount((prevCount) => prevCount + 1);
      };

      eventSource.onopen = () => {
        console.log('SSE 연결 성공');
        setRetryCount(0);
      };
    };

    connectSSE();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [storeId, userId, canPlaySound, retryCount, setAlarm]);

  return (
    <div className={cn('container')}>
      <header className={cn('header')}>
        {canPlaySound ? (
          <Alarm onClick={() => setCanPlaySound(false)} width={50} height={50} className={cn('alarm')} />
        ) : (
          <AlarmOff onClick={() => setCanPlaySound(true)} width={50} height={50} className={cn('alarm')} />
        )}
      </header>
      <div className={cn('gridBox')}>
        <Link href={ROUTE.In_Progress} className={cn('inProcessBox', { onPage: pathName === '/in-progress' })}>
          <InProcess height={50} width={50} />
          <p>처리중</p>
        </Link>
        <Link href={ROUTE.COMPLETE} className={cn('completeBox', { onPage: pathName === '/complete' })}>
          <Complete height={50} width={50} />
          <p>완료</p>
        </Link>
        <Link href={ROUTE.REGISTER} className={cn('registerBox', { onPage: pathName === '/register' })}>
          <Register height={50} width={50} />
          <p>등록</p>
        </Link>
        <Link href={ROUTE.MY_PAGE} className={cn('myPageBox', { onPage: pathName === '/my-page' })}>
          <MyPage height={50} width={50} />
          <p>마이페이지</p>
        </Link>
        <div className={cn('logoBox')}>
          <Logo height={100} width={100} />
        </div>
      </div>
    </div>
  );
}
