"use client"; 
import styles from '@/app/my-page/terms-policies/page.module.scss';
import Link from 'next/link';
import { useState } from 'react';
import Modal from '@/components/common/Modal/modal';

export default function Terms() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };

  return <div className={styles.container}>
    <div className={styles.content}> 
      <div className={styles.mainContent}>
          <div className={styles.title}>약관 및 정책</div>
          <div className={styles.policyBox}>
            <div className={styles.policyItem}>
              <p>이용 약관 보기</p>
              <button onClick={() => openModal('이용 약관 내용.')}>
                전문 보기
              </button>
            </div>
            <div className={styles.policyItem}>
              <p>개인정보 처리 방침 보기</p>
              <button onClick={() => openModal('개인정보 처리 방침 내용.')}>
                전문 보기
              </button>
            </div>
            <div className={styles.policyItem}>
              <p>마케팅 정보 보기</p>
              <button onClick={() => openModal('마케팅 정보 내용.')}>
                전문 보기
              </button>
            </div>
          </div>
          <Link href="/my-page">
            <button className={styles.exitButton}>뒤로가기</button>
          </Link>
        </div>
      </div>
      {isModalOpen && <Modal content={modalContent} onClose={closeModal} />}
  </div>;
}