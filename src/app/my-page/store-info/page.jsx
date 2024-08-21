"use client";
import styles from '@/app/my-page/store-info/page.module.scss';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import axiosInstance from '@/apis/axiosInstance'; // axiosInstance를 import

export default function StoreInfo() {
  const [storeName, setStoreName] = useState('');
  const [storeAddress, setStoreAddress] = useState('');
  const [storeNumber, setStoreNumber] = useState('');
  const [openingHours, setOpeningHours] = useState({ open: '', close: '' });
  const [discountHours, setDiscountHours] = useState({ start: '', end: '' });
  const [additionalComment, setAdditionalComment] = useState('');
  const [error, setError] = useState(null);
  const storeId = 'VQtTGTCc13EWulU5sZmI'; // storeId

  const apiUrl = `/stores`; // storeId는 이제 요청 본문에 포함됩니다.

  // 서버에서 데이터를 가져오는 함수
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`${apiUrl}?storeId=${storeId}`); // GET 요청
        const data = response.data;
        
        // 받아온 데이터를 각 상태로 설정합니다.
        setStoreName(data.storeName);
        setStoreAddress(data.address);
        setStoreNumber(data.storeNumber);
        setOpeningHours({ open: data.openTime, close: data.closeTime });
        setDiscountHours({ start: data.saleStart, end: data.saleEnd });
        setAdditionalComment(data.additionalComment);
      } catch (err) {
        console.error("Error fetching store data:", err);
        setError('데이터를 가져오는 데 실패했습니다.');
      }
    };

    fetchData();
  }, [apiUrl, storeId]);

  const handleSave = async () => {
    try {
      const response = await axiosInstance.put(apiUrl, {
        storeId: storeId,
        storeName: storeName,
        address: storeAddress,
        storeNumber: storeNumber,
        openTime: openingHours.open,
        closeTime: openingHours.close,
        saleStart: discountHours.start,
        saleEnd: discountHours.end,
        additionalComment: additionalComment,
      });

      if (response.status === 200) {
        alert('저장 완료되었습니다.');
      }
    } catch (err) {
      console.error("Error saving store data:", err);
      alert('저장하는 데 실패했습니다.');
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

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
          <textarea
            className={styles.noticeContent}
            value={additionalComment}
            onChange={(e) => setAdditionalComment(e.target.value)}
          />
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
