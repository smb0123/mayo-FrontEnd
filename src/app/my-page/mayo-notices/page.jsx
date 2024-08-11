"use client";
import styles from '@/app/my-page/mayo-notices/page.module.scss';
import { useState } from 'react';
import Link from 'next/link';
import Modal from '@/components/common/NotiModal/Modal';

export default function Mayo_notice() {
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const notices = [
    { title: 'mayo 앱 출시 안내', content: '안녕하세요, mayo입니다.\n2023년 10월 10일부터 카카오톡 서비스가 종료됩니다. 마감된 서비스가 앱 서비스로 전환될 예정으로 미리 안내 드립니다.\n\n전화서비스: 카카오톡 mayo 채널 -> mayo APP\n전환시점: 2022년 09월 01일 금요일\n\n그동안 카카오톡 서비스를 이용해주신 고객님들께 감사드리며 앞으로도 더 나은 서비스를 제공하기 위해 최선을 다하겠습니다. 감사합니다.' },
    { title: 'mayo 카카오톡 서비스 일시 중단 안내', content: '내용' },
    { title: 'mayo 카카오톡 서비스 일시 중단 안내', content: '내용' },
    { title: 'mayo 카카오톡 서비스 일시 중단 안내', content: '내용' },
    { title: 'mayo 카카오톡 서비스 일시 중단 안내', content: '내용' },
    //서버연결

    
  ];

  const openModal = (notice) => {
    setSelectedNotice(notice);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedNotice(null);
  };

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
