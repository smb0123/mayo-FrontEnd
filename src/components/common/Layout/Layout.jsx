import classNames from 'classnames/bind';
import styles from '@/components/common/Layout/Layout.module.scss';
import Header from '@/components/common/Header/Header';
import SideBar from '@/components/common/SideBar/SideBar';

const cn = classNames.bind(styles);

export default function Layout({ children }) {
  return (
    <div className={cn('container')}>
      <SideBar />
      <div className={cn('box')}>
        <Header />
        {children}
      </div>
    </div>
  );
}
