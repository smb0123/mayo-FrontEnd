'use client';
import styles from '@/app/(Layout)/my-page/page.module.scss';
import Link from 'next/link';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ROUTE from '@/constants/route';

export default function MainPage() {
  const router = useRouter();

  const onSignOut = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
      alert('로그아웃 되었습니다.');
      localStorage.removeItem('token');
      localStorage.removeItem('alarm');
      localStorage.removeItem('storeId');
      router.push('/');
    } catch (e) {
      alert('로그아웃 중 오류가 발생했습니다.');
    }
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

  return (
    <div className={styles.buttonGrid}>
      <Link href="/my-page/product-info">
        <button>상품 정보</button>
      </Link>
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
