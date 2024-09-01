// 약관 및 정책 모달
import styles from '@/components/page-layout/Modal/Modal.module.scss';

export default function Modal({ content, onClose }) {
  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <p>{content}</p>
        <button className={styles.closeButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}
