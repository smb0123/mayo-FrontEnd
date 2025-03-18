'use client';
import styles from '@/app/(Layout)/my-page/terms-policies/page.module.scss';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axiosInstance from '@/apis/axiosInstance'; // axiosInstance를 불러옵니다.
import Modal from '@/components/common/Modal/Modal';
import { useRouter } from 'next/navigation';
import ROUTE from '@/constants/route';

export default function Terms() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const fetchData = async (boardId) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get('/board', {
        params: {
          boardId: boardId,
        },
      });
      setSelectedContent(response.data.content); // JSON의 content를 설정
      setIsLoading(false);
      setIsModalOpen(true);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContent('');
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
    return <div>서버 오류</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.mainContent}>
          <div className={styles.title}>약관 및 정책</div>
          <div className={styles.policyBox}>
            <button className={styles.policyItem} onClick={() => fetchData('0YhQlOD7AdwgATAsYrJW')}>
              <p>이용 약관 보기</p>
            </button>
            <button className={styles.policyItem} onClick={() => fetchData('SsGnm5370wo8YnItGAdW')}>
              <p>개인정보 처리 방침 보기</p>
            </button>
            <button className={styles.policyItem} onClick={() => fetchData('CmaSlWy6PMoWAdqrjZrl')}>
              <p>마케팅 정보 보기</p>
            </button>
          </div>
          <div className={styles.buttonContainer}>
            <Link href="/my-page" className={styles.exitButton}>
              뒤로가기
            </Link>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal content={selectedContent} onClose={closeModal} />}
    </div>
  );
}
