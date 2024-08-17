'use client';

import classNames from 'classnames/bind';

import styles from '@/components/common/SideBar/SideBar.module.scss';

import InProcess from '@/icons/in_process.svg';
import Complete from '@/icons/complete.svg';
import Register from '@/icons/register.svg';
import MyPage from '@/icons/my_page.svg';
import Logo from '@/icons/logo.svg';
import Link from 'next/link';
import ROUTE from '@/constants/route';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const cn = classNames.bind(styles);

export default function SideBar() {
  const pathName = usePathname();

  return (
    <div className={cn('container')}>
      <header className={cn('header')}></header>
      <div className={cn('gridBox')}>
        <Link href={ROUTE.HOME} className={cn('inProcessBox', { onPage: pathName === '/' })}>
          <InProcess height={50} width={50} />
          <p>처리중</p>
        </Link>
        <Link href={ROUTE.COMPLETE} className={cn('completeBox', { onPage: pathName === '/complete' })}>
          <Complete height={50} width={50} />
          <p>완료</p>
        </Link>
        <Link href={ROUTE.REGISTER} className={cn('registerBox', { onPage: pathName === '/register' })}>
          <Register height={50} width={50} />
          <p>등록</p>
        </Link>
        <Link href={ROUTE.MY_PAGE} className={cn('myPageBox', { onPage: pathName === '/my-page' })}>
          <MyPage height={50} width={50} />
          <p>마이페이지</p>
        </Link>
        <div className={cn('logoBox')}>
          <Logo height={100} width={100} />
        </div>
      </div>
    </div>
  );
}
