'use client';

import styles from '@/app/(Layout)/my-page/customer-center/page.module.scss';
import ROUTE from '@/constants/route';
import Logo from '@/icons/logo.svg';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CustomerCenter() {
  const router = useRouter();

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
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.mainContent}>
          <Logo height={170} width={170} className={styles.logoImage} />
          <p>불편한 점이 있으신가요?</p>
          <p>운영 시간: 평일 09시 ~ 18시(공휴일 제외)</p>
          <Link href="http://pf.kakao.com/_pxojzxj">
            <button className={styles.chatButton}>마요 카카오톡 채널</button>
          </Link>
          <Link href="/my-page">
            <button className={styles.exitButton}>뒤로가기</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
