import classNames from 'classnames/bind';

import styles from '@/components/common/RejectModal/RejectModal.module.scss';
import ModalPortal from '../ModalPortal';
import { useRef } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';

const cn = classNames.bind(styles);

export default function RejectModal({ onClick, className }) {
  const modalRef = useRef(null);

  useOutsideClick(modalRef, onClick);

  return (
    <ModalPortal>
      <div className={cn('container')}>
        <div className={cn('box', className)} ref={modalRef}>
          <p className={cn('title')}>주문거절</p>
          <div className={cn('hr')}></div>
          <div className={cn('contentBox')}>
            <p className={cn('content')}>주문 거절 사유를 선택해주세요.</p>
            <div className={cn('buttonBox')}>
              <button className={cn('button')}>재고소진</button>
              <button className={cn('button')}>영업종료</button>
              <button className={cn('button')}>기타(가게사정)</button>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
