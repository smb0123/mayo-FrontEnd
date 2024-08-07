import styles from '@/app/my-page/page.module.scss';

export default function MainPage() {
  return <div className={styles.buttonGrid}>
    <button>상품 정보</button>
    <button>알림 설정</button>
    <button>가게 정보</button>
    <button>고객 센터</button>
    <button>마요 공지사항</button>
    <button>약관 및 정책</button>
  </div>;
}
