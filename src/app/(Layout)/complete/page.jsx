'use client';

import CompletePageLayout from '@/components/page-layout/CompletePageLayout/CompletePageLayout';
import ROUTE from '@/constants/route';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function CompletePage() {
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

  return <CompletePageLayout />;
}
