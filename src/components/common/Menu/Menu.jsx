import classNames from 'classnames/bind';

import styles from '@/components/common/Menu/Menu.module.scss';

const cn = classNames.bind(styles);

export default function Menu({ name, number, price }) {
  return (
    <div className={cn('container')}>
      <p>{name}</p>
      <div className={cn('box')}>
        <p>{number}</p>
        <p>{price.toLocaleString()}원</p>
      </div>
    </div>
  );
}
