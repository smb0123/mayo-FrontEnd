import classNames from 'classnames/bind';

import styles from '@/components/page-layout/CompletePageLayout/CompleteDetailOrder/CompleteDetailOrder.module.scss';
import { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import getDetailOrder from '@/components/page-layout/MainPageLayout/DetailOrder/apis/getDetailOrder';
import Menu from '@/components/common/Menu/Menu';
import { CompleteOrderContext } from '../CompletePageLayout';

const cn = classNames.bind(styles);

const data1 = {
  createdAt: {
    seconds: 1723376049,
  },
  itemCount: [1, 2],
  itemName: ['바삭바삭 로투스 요거팡 2인', '허파'],
  pickupTime: {
    seconds: 1723376400,
  },
  request: '소스빼주세요',
  reservationId: 'id',
  reservationIsPlastic: true,
  subTotal: [7700, 5000],
  totalPrice: 7700,
  totalQuantity: 1,
  userNickName: '민보',
};

export default function CompleteDetailOrder() {
  const { orderId } = useContext(CompleteOrderContext);

  const { data } = useQuery({
    queryKey: ['detailOrder', orderId],
    queryFn: () => getDetailOrder(orderId),
    enabled: !!orderId,
  });

  const menuList = data1?.itemCount.map((count, index) => ({
    count: count,
    subTotal: data1.subTotal[index],
    itemName: data1.itemName[index],
  }));

  const createTime = new Date(data1.createdAt.seconds * 1000);
  const pickUpTime = new Date(data1.pickupTime.seconds * 1000);

  return (
    <>
      {orderId ? (
        <div className={cn('container')}>
          <div className={cn('titleBox')}>
            <p className={cn('menuTitle')}>
              메뉴 {data1?.totalQuantity}개 총 {data1?.totalPrice.toLocaleString()}원
            </p>
          </div>
          <div className={cn('detailInfoBox')}>
            <div className={cn('leftDetailInfoBox')}>
              <div className={cn('requestBox')}>
                <p className={cn('requestTitle')}>요청사항</p>
                <p className={cn('request')}>{data1.request}</p>
                <p className={cn('request')}>
                  일회용품 사용 여부: {data1.reservationIsPlastic ? '필요해요 !' : '필요없어요 !'}
                </p>
              </div>
              <div className={cn('detailOrderBox')}>
                <p className={cn('detailOrderTitle')}>주문내역</p>
                <div className={cn('detailOrderContentBox')}>
                  <div className={cn('detailOrderContent')}>
                    {menuList.map((menu, idx) => (
                      <Menu name={menu.itemName} number={menu.count} price={menu.subTotal} key={idx} />
                    ))}
                  </div>
                  <div className={cn('hr')}></div>
                  <div className={cn('totalBox')}>
                    <div className={cn('totalDetailBox')}>
                      <p>{data1.totalQuantity}</p>
                      <p>{data1.totalPrice.toLocaleString()}원</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={cn('rightDetailInfoBox')}>
              <div className={cn('statusBox')}>
                <p className={cn('title')}>완료된 주문입니다!</p>
                <p className={cn('name')}>{data1?.userNickName}(닉네임)</p>
                <p className={cn('phoneNumber')}>010-0000-0000</p>
              </div>
              <div className={cn('dateBox')}>
                <div className={cn('reservationIdBox')}>
                  예약번호: <p className={cn('reservationId')}>{data1.reservationId}</p>
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
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={cn('noOrderContainer')}>
          <p className={cn('noOrder')}>주문을 클릭해주세요</p>
        </div>
      )}
    </>
  );
}
