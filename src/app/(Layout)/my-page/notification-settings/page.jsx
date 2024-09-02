"use client";
import styles from '@/app/my-page/notification-settings/page.module.scss';
import { useState } from 'react';
import Link from 'next/link';

export default function Notification() {
  const [isNotificationEnabled, setIsNotificationEnabled] = useState(false);

  const toggleNotification = () => {
    setIsNotificationEnabled(!isNotificationEnabled);
  };
  
  return <div className={styles.container}>
    <div className={styles.content}>
      <div className={styles.mainContent}>
          <div className={styles.title}>알림 설정</div>
          <div className={styles.notificationBox}>
            <p>알림 설정</p>
            <label className={styles.switch}>
              <input type="checkbox" checked={isNotificationEnabled} onChange={toggleNotification} />
              <span className={styles.slider}></span>
            </label>
          </div>
          <Link href="/my-page">
            <button className={styles.exitButton}>뒤로가기</button>
          </Link>
        </div>
      </div>
  </div>;
}