import classNames from 'classnames/bind';

import styles from '@/components/common/StoreProduct/StoreProduct.module.scss';
import Plus from '@/icons/plus.svg';
import Minus from '@/icons/minus.svg';

const cn = classNames.bind(styles);

export default function StoreProduct({ title, count, setCount, order }) {
  const handleMinusClick = () => {
    if (count[order] >= 1) {
      const array = [...count];
      array[order]--;
      setCount([...array]);
    }
  };

  const handlePlusClick = () => {
    const array = [...count];
    array[order]++;
    setCount([...array]);
  };

  return (
    <div className={cn('container')}>
      <div className={cn('leftBlank')}></div>
      <div className={cn('title')}>{title}</div>
      <div className={cn('rightBlank')}></div>
      <div className={cn('count')}>
        <Minus onClick={handleMinusClick} className={cn('minus')} width={35} height={35} />
        {count[order]}
        <Plus onClick={handlePlusClick} className={cn('plus')} width={28} height={28} />
      </div>
    </div>
  );
}
