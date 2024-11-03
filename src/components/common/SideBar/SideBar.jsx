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

const cn = classNames.bind(styles);

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
if (!firebase.apps.length) {
  console.log('Initializing Firebase...');
  firebase.initializeApp(firebaseConfig);
} else {
  console.log('Firebase already initialized');
}

const messaging = firebase.messaging();

export default function SideBar() {
  const alarmSoundRef = useRef(null);
  const [canPlaySound, setCanPlaySound] = useState(true);
  const pathName = usePathname();
  const { setAlarm } = useAlarm();

  useEffect(() => {
    alarmSoundRef.current = new Audio('/mp3/alarm.mp3');
  }, []);

  useEffect(() => {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        messaging
          .getToken()
          .then((token) => {
            console.log('FCM Token:', token);
          })
          .catch((error) => {
            console.error('Error getting token:', error);
          });
      } else {
        console.log('Unable to get permission to notify.');
      }
    });

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }

    // 메시지 수신 처리
    messaging.onMessage((payload) => {
      if (canPlaySound) {
        alarmSoundRef.current.play().catch((error) => {
          console.log('알람 재생 오류:', error);
        });
      }
      console.log('Message received. ', payload);
      setAlarm(payload);
      // 알림 표시 등을 처리하는 코드 추가
    });
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
