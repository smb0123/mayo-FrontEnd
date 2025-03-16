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
import firebase from 'firebase/compat/app';
import Alarm from '@/icons/alarm.svg';
import AlarmOff from '@/icons/alarm_off.svg';
import 'firebase/compat/messaging';
import { useAlarm } from '@/store/useStoreId';
import { firebaseConfig } from '@/utils/firebase/firebase';

const cn = classNames.bind(styles);

export default function SideBar() {
  const [canPlaySound, setCanPlaySound] = useState(true);
  const pathName = usePathname();
  const { setAlarm } = useAlarm();
  const alarmSoundRef = useRef(null);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const messaging = firebase.messaging();

  useEffect(() => {
    alarmSoundRef.current = new Audio('/mp3/mayo-alarm.mp3');

    const stopAlarmSound = () => {
      if (alarmSoundRef.current && !alarmSoundRef.current.paused) {
        alarmSoundRef.current.pause();
        alarmSoundRef.current.currentTime = 0;
      }
    };

    document.addEventListener('click', stopAlarmSound);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/firebase-messaging-sw.js');
    }

    messaging.onMessage((payload) => {
      if (canPlaySound) {
        alarmSoundRef.current.play().catch((error) => {
          console.log('알람 재생 오류:', error);
        });
      }
      setAlarm(payload);
    });

    return () => {
      document.removeEventListener('click', stopAlarmSound);
    };
  }, []);

  return (
    <div className={cn('container')}>
      <header className={cn('header')}>
        {canPlaySound ? (
          <Alarm onClick={() => setCanPlaySound(true)} width={50} height={50} className={cn('alarm')} />
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
        <Link
          href={ROUTE.MY_PAGE}
          className={cn('myPageBox', {
            onPage: [
              '/my-page',
              '/my-page/product-info',
              '/my-page/store-info',
              '/my-page/customer-center',
              '/my-page/mayo-notices',
              '/my-page/terms-policies',
            ].includes(pathName),
          })}
        >
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
