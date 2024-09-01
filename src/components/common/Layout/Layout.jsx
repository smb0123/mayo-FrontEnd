'use client';

import classNames from 'classnames/bind';
import styles from '@/components/common/Layout/Layout.module.scss';
import Header from '@/components/common/Header/Header';
import SideBar from '@/components/common/SideBar/SideBar';
import { usePathname } from 'next/navigation'; 

const cn = classNames.bind(styles);

export default function Layout({ children }) {
  const pathname = usePathname(); 

 
  const isLoginPage = pathname === '/login';

  return (
    
    !isLoginPage ? (
      <div className={cn('container')}>
        <SideBar />
        <div className={cn('box')}>
          <Header />
          {children}
        </div>
      </div>
    ) : (
      children 
    )
  );
}
