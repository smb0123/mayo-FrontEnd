"use client";
import styles from '@/app/my-page/store-info/page.module.scss';
import Link from 'next/link';
import { useState } from 'react';

export default function StoreInfo() {
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeNumber, setStoreNumber] = useState('');
  const [openingHours, setOpeningHours] = useState({ open: '', close: '' });
  const [discountHours, setDiscountHours] = useState({ start: '', end: '' });

  const handleSave = () => {
    
    alert('저장 완료되었습니다.');
  };

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.title}>가게 정보</div>
      </div>
      <div className={styles.content}>
        <div className={styles.storeInfo}>
          <label>상점명</label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
          />
          <label>가게 주소</label>
          <input
            type="text"
            value={storeAddress}
            onChange={(e) => setStoreAddress(e.target.value)}
          />
          <label>가게 번호</label>
          <input
            type="text"
            value={storeNumber}
            onChange={(e) => setStoreNumber(e.target.value)}
          />
          <label>영업시간</label>
          <div className={styles.timeInput}>
            <input
              type="text"
              placeholder="시작 00:00"
              value={openingHours.open}
              onChange={(e) =>
                setOpeningHours({ ...openingHours, open: e.target.value })
              }
            />
            <span className={styles.water}>~</span>
            <input
              type="text"
              placeholder="종료 00:00"
              value={openingHours.close}
              onChange={(e) =>
                setOpeningHours({ ...openingHours, close: e.target.value })
              }
            />
          </div>
          <label>할인시간</label>
          <div className={styles.timeInput}>
            <input
              type="text"
              placeholder="시작 00:00"
              value={discountHours.start}
              onChange={(e) =>
                setDiscountHours({ ...discountHours, start: e.target.value })
              }
            />
            <span className={styles.water}>~</span>
            <input
              type="text"
              placeholder="종료 00:00"
              value={discountHours.end}
              onChange={(e) =>
                setDiscountHours({ ...discountHours, end: e.target.value })
              }
            />
          </div>
        </div>
        <div className={styles.noticeBoard}>
          <div className={styles.noticeTitle}>공지사항</div>
          <textarea className={styles.noticeContent}></textarea>
        </div>
      </div>
      <div className={styles.buttons}>
        <Link href="/my-page">
          <button className={styles.exitButton}>뒤로가기</button>
        </Link>
        <button className={styles.saveButton} onClick={handleSave}>저장</button>
      </div>
    </div>
  );
}