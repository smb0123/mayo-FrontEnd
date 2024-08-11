
import styles from '@/components/common/Modal/Modal.module.scss';
//약관 및 정책 모달
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