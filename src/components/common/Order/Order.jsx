import classNames from 'classnames/bind';

import styles from '@/components/common/Order/Order.module.scss';

const cn = classNames.bind(styles);

export default function Order({ menu, date, id, orderStatus, setOrderId, setOrderStatus }) {
  const time = new Date(date * 1000);

  const formattedDate = time.toLocaleString('ko-KR', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleOrderClick = () => {
    setOrderId(id);
    setOrderStatus && setOrderStatus(orderStatus);
  };

  return (
    <button className={cn('container')} onClick={handleOrderClick}>
      <div className={cn('title')}>
        주문메뉴: <p className={cn('menu')}>{menu}</p>
      </div>
      <p className={cn('title')}>주문일시: {formattedDate}</p>
    </button>
  );
}
