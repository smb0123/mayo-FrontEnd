"use client";
import styles from '@/app/my-page/terms-policies/page.module.scss';
import Link from 'next/link';
import { useState } from 'react';
import axiosInstance from '@/apis/axiosInstance'; // axiosInstance를 불러옵니다.
import Modal from '@/components/page-layout/Modal/Modal';

export default function Terms() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  if (error) {
    return <div>서버 오류</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.mainContent}>
          <div className={styles.title}>약관 및 정책</div>
          <div className={styles.policyBox}>
            <div className={styles.policyItem}>
              <p>이용 약관 보기</p>
              <button onClick={() => fetchData('0YhQlOD7AdwgATAsYrJW')}>전문 보기</button>
            </div>
            <div className={styles.policyItem}>
              <p>개인정보 처리 방침 보기</p>
              <button onClick={() => fetchData('SsGnm5370wo8YnItGAdW')}>전문 보기</button>
            </div>
            <div className={styles.policyItem}>
              <p>마케팅 정보 보기</p>
              <button onClick={() => fetchData('CmaSlWy6PMoWAdqrjZrl')}>전문 보기</button>
            </div>
          </div>
          <Link href="/my-page">
            <button className={styles.exitButton}>뒤로가기</button>
          </Link>
        </div>
      </div>
      {isModalOpen && <Modal content={selectedContent} onClose={closeModal} />}
    </div>
  );
}
