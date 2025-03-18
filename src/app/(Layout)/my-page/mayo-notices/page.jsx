'use client';
import styles from './page.module.scss';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axiosInstance from '@/apis/axiosInstance';
import Modal from '@/components/common/NotiModal/NotiModal';
import { useRouter } from 'next/navigation';
import ROUTE from '@/constants/route';

export default function MayoNotice() {
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axiosInstance.get('/board-notice');
        setNotices(response.data);
        setLoading(false);
      } catch (err) {
        setError('공지사항을 가져오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  const openModal = (notice) => {
    setSelectedNotice(notice);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedNotice(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storeId = localStorage.getItem('storeId');

    if (!token) {
      alert('로그인 정보가 없습니다. 다시 로그인해주세요');
      return router.push(ROUTE.HOME);
    }

    if (!storeId) {
      alert('가게 정보가 없습니다. 다시 로그인해주세요');
      return router.push(ROUTE.HOME);
    }
  }, [router]);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.mainContent}>
          <div className={styles.title}>공지사항</div>
          <div className={styles.noticeList}>
            {notices.map((notice, index) => (
              <div key={index} className={styles.noticeItem} onClick={() => openModal(notice)}>
                {notice.title}
              </div>
            ))}
          </div>
          <Link href="/my-page">
            <button className={styles.exitButton}>뒤로가기</button>
          </Link>
        </div>
      </div>
      {modalOpen && selectedNotice && (
        <Modal title={selectedNotice.title} content={selectedNotice.content} onClose={closeModal} />
      )}
    </div>
  );
}
