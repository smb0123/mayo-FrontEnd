import styles from '@/app/my-page/page.module.scss';
import Link from 'next/link';

export default function MainPage() {
  return <div className={styles.buttonGrid}>
    <Link href="/my-page/product-info">
      <button>상품 정보</button>
    </Link>
    {/* <Link href="/my-page/notification-settings">
      <button>알림 설정</button>
    </Link> */}
    <Link href="/my-page/store-info">
      <button>가게 정보</button>
    </Link>
    <Link href="/my-page/customer-center">
      <button>고객 센터</button>
    </Link>
    <Link href="/my-page/mayo-notices">
      <button>마요 공지사항</button>
    </Link>
    <Link href="/my-page/terms-policies">
      <button>약관 및 정책</button>
    </Link>
  </div>;
}
