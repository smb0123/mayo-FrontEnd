'use client';
import styles from '@/app/(Layout)/my-page/page.module.scss';
import Link from 'next/link';
import { getAuth, signOut } from 'firebase/auth'; // Firebase 인증 관련 함수 임포트
import { useRouter } from 'next/navigation'; // Next.js에서 페이지 이동을 위한 useRouter 임포트

export default function MainPage() {
  const router = useRouter();

  const onSignOut = async () => {
    try {
      const auth = getAuth(); // Firebase에서 auth 객체를 가져옵니다.
      await signOut(auth); // Firebase signOut 함수 호출
      alert('로그아웃 되었습니다.');
      router.push('/login'); // 로그아웃 후 로그인 페이지로 리다이렉트
    } catch (error) {
      console.log(error);
      alert('로그아웃 중 오류가 발생했습니다.'); // 오류 발생 시 표시할 메시지
    }
  };

  return (
    <div className={styles.buttonGrid}>
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
      <button onClick={onSignOut}>로그아웃</button>
    </div>
  );
}
