'use client';

import classNames from 'classnames/bind';
import styles from '@/components/common/Layout/Layout.module.scss';
import Header from '@/components/common/Header/Header';
import SideBar from '@/components/common/SideBar/SideBar';
import { useEffect, useRef } from 'react';
import { useStoreId, useUserId, useAlarm } from '@/store/useStoreId';

const cn = classNames.bind(styles);

export default function Layout({ children }) {
  const { storeId } = useStoreId();
  const { userId } = useUserId();
  const { setAlarm } = useAlarm();
  const alarmSoundRef = useRef(null);

  let AudioContext;
  let audioContext;

  window.onload = function () {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        AudioContext = window.AudioContext;
        audioContext = new AudioContext();
      })
      .catch((e) => {
        console.error(`Audio permissions denied: ${e}`);
      });
  };

  useEffect(() => {
    let eventSource;
    alarmSoundRef.current = new Audio('/mp3/alarm.mp3');

    const connectSSE = () => {
      eventSource = new EventSource(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}sse/reservations-new?storeId=${storeId}&userId=${userId}`
      );

      eventSource.addEventListener('new-reservation', (event) => {
        let Notification = event.data;
        const newNotification = JSON.parse(Notification);

        if (alarmSoundRef.current) {
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
      };

      eventSource.onopen = () => {
        console.log('SSE 연결 성공');
      };
    };

    connectSSE();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, [storeId, userId]);

  return (
    <div className={cn('container')}>
      <SideBar />
      <div className={cn('box')}>
        <Header />
        {children}
      </div>
    </div>
  );
}
