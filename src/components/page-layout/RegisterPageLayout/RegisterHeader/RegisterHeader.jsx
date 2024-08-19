import classNames from 'classnames/bind';

import styles from '@/components/page-layout/RegisterPageLayout/RegisterHeader/RegisterHeader.module.scss';

const cn = classNames.bind(styles);

export default function RegisterHeader() {
  return (
    <header className={cn('container')}>
      <div className={cn('leftBlank')}></div>
      <div className={cn('header')}>상품명</div>
      <div className={cn('rightBlank')}></div>
      <div className={cn('count')}>수량</div>
    </header>
  );
}
