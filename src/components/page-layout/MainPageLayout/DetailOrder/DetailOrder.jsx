import classNames from 'classnames/bind';

import styles from '@/components/page-layout/MainPageLayout/DetailOrder/DetailOrder.module.scss';
import { useContext, useState } from 'react';
import { OrderContext } from '../MainPageLayout';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import getDetailOrder from './apis/getDetailOrder';
import Menu from '@/components/common/Menu/Menu';
import YesOrNoModal from '@/components/common/YesOrNoModal/YesOrNoModal';
import putOrderAccept from './apis/putOrderAccept';
import putOrderReject from './apis/putOrderReject';
import putOrderDone from './apis/putOrderDone';

const cn = classNames.bind(styles);

export default function DetailOrder() {
  const { orderId, orderStatus } = useContext(OrderContext);
  const [isYesButton, setIsYesButton] = useState(false);
  const [isNoButton, setIsNoButton] = useState(false);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['detailOrder', orderId],
    queryFn: () => getDetailOrder(orderId),
    enabled: !!orderId,
  });

  const orderAcceptMutation = useMutation({
    mutationFn: (orderId) => putOrderAccept(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inProgressOrder'] });
      queryClient.invalidateQueries({ queryKey: ['newOrder'] });
    },
  });

  const orderRejectMutation = useMutation({
    mutationFn: (orderId) => putOrderReject(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['newOrder'] });
    },
  });

  const orderDoneMutation = useMutation({
    mutationFn: (orderId) => putOrderDone(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inProgressOrder'] });
      queryClient.invalidateQueries({ queryKey: ['doneOrder'] });
    },
  });

  const menuList = data?.itemCount.map((count, index) => ({
    count: count,
    subTotal: data?.subTotal[index],
    itemName: data?.itemName[index],
  }));

  const createTime = new Date(data?.createdAt.seconds * 1000);
  const pickUpTime = new Date(data?.pickupTime.seconds * 1000);

  const handleYesButtonClick = async () => {
    await orderAcceptMutation.mutate(orderId);
    setIsYesButton(false);
  };

  const handleNoButtonClick = () => {
    orderRejectMutation.mutate(orderId);
    setIsNoButton(false);
  };

  const handleOrderDoneButtonClick = () => {
    orderDoneMutation.mutate(orderId);
  };

  return (
    <>
      {orderId ? (
        <>
          <div className={cn('container')}>
            <div className={cn('titleBox')}>
              <p className={cn('menuTitle')}>
                메뉴 {data?.totalQuantity}개 총 {data?.totalPrice.toLocaleString()}원
              </p>
              {orderStatus === 'new' && (
                <div className={cn('buttonBox')}>
                  <button onClick={() => setIsYesButton(true)} className={cn('responseButton')}>
                    수락
                  </button>
                  <button onClick={() => setIsNoButton(true)} className={cn('responseButton')}>
                    거절
                  </button>
                </div>
              )}
            </div>
            <div className={cn('detailInfoBox')}>
              <div className={cn('leftDetailInfoBox')}>
                <div className={cn('requestBox')}>
                  <p className={cn('requestTitle')}>요청사항</p>
                  <p className={cn('request')}>{data?.request}</p>
                  <p className={cn('request')}>
                    일회용품 사용 여부: {data?.reservationIsPlastic ? '필요해요 !' : '필요없어요 !'}
                  </p>
                </div>
                <div className={cn('detailOrderBox')}>
                  <p className={cn('detailOrderTitle')}>주문내역</p>
                  <div className={cn('detailOrderContentBox')}>
                    <div className={cn('detailOrderContent')}>
                      {menuList?.map((menu, idx) => (
                        <Menu name={menu.itemName} number={menu.count} price={menu.subTotal} key={idx} />
                      ))}
                    </div>
                    <div className={cn('hr')}></div>
                    <div className={cn('totalBox')}>
                      <div className={cn('totalDetailBox')}>
                        <p>{data?.totalQuantity}</p>
                        <p>{data?.totalPrice.toLocaleString()}원</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={cn('rightDetailInfoBox')}>
                <div className={cn('statusBox')}>
                  <p className={cn('title')}>
                    {orderStatus === 'new' ? '신규 주문입니다!' : '주문이 수락되어 진행중입니다!'}
                  </p>
                  <p className={cn('name')}>{data?.userNickName}(닉네임)</p>
                </div>
                <div className={cn('dateBox')}>
                  <div className={cn('reservationIdBox')}>
                    예약번호: <p className={cn('reservationId')}>{data?.reservationId}</p>
                  </div>
                  <div className={cn('reservationDateBox')}>
                    예약일시:
                    <p className={cn('reservationDate')}>
                      {createTime.toLocaleString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  <div className={cn('pickUpBox')}>
                    픽업시간:
                    <p className={cn('pickUp')}>
                      {pickUpTime.toLocaleString('ko-KR', {
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                  {orderStatus === 'inProgress' && (
                    <button onClick={handleOrderDoneButtonClick} className={cn('orderButton')}>
                      주문완료
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {isYesButton && (
            <YesOrNoModal
              className={cn('modal')}
              title="주문승인"
              noClick={() => setIsYesButton(false)}
              content="주문을 승인하시겠습니까?"
              yesClick={handleYesButtonClick}
            />
          )}
          {isNoButton && (
            <YesOrNoModal
              className={cn('modal')}
              title="주문거절"
              noClick={() => setIsNoButton(false)}
              content="주문을 거절하시겠습니까?"
              yesClick={handleNoButtonClick}
            />
          )}
        </>
      ) : (
        <div className={cn('noOrderContainer')}>
          <p className={cn('noOrder')}>주문을 클릭해주세요</p>
        </div>
      )}
    </>
  );
}
