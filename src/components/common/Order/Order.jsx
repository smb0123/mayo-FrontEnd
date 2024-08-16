import classNames from 'classnames/bind';

import styles from '@/components/common/Order/Order.module.scss';
import { useContext } from 'react';
import { OrderContext } from '@/components/page-layout/MainPageLayout/MainPageLayout';

const cn = classNames.bind(styles);

export default function Order({ menu, date, id, orderStatus }) {
  const { setOrderId, setOrderStatus } = useContext(OrderContext);

  const time = new Date(date * 1000);

  const formattedDate = time.toLocaleString('ko-KR', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleOrderClick = () => {
    setOrderId(id);
    setOrderStatus(orderStatus);
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
