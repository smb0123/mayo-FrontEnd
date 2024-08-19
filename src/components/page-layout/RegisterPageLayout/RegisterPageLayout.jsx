import classNames from 'classnames/bind';

import styles from '@/components/page-layout/RegisterPageLayout/RegisterPageLayout.module.scss';

const cn = classNames.bind(styles);

import RegisterHeader from '@/components/page-layout/RegisterPageLayout/RegisterHeader/RegisterHeader';
import StoreProductList from './StoreProductList/StoreProductList';

export default function RegisterPageLayout() {
  return (
    <div className={cn('container')}>
      <RegisterHeader />
      <StoreProductList />
    </div>
  );
}
