import styles from '@/components/common/NotiModal/Modal.module.scss';
//공지사항 모달
export default function Modal({ title, content, onClose }) {
  return (
    //content 내용 넣기
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{title}</h2>
        </div>
        <div className={styles.modalBody}>
          <p>{content}</p>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          닫기
        </button>
      </div>
    </div>
  );
}