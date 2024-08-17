import classNames from 'classnames/bind';

import styles from '@/components/common/YesOrNoModal/YesOrNoModal.module.scss';
import ModalPortal from '../ModalPortal';
import { useRef } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';

const cn = classNames.bind(styles);

export default function YesOrNoModal({ title, content, yesClick, noClick, className }) {
  const modalRef = useRef(null);

  useOutsideClick(modalRef, noClick);

  return (
    <ModalPortal>
      <div className={cn('container')}>
        <div className={cn('box', className)} ref={modalRef}>
          <p className={cn('title')}>{title}</p>
          <div className={cn('hr')}></div>
          <div className={cn('contentBox')}>
            <p className={cn('content')}>{content}</p>
            <div className={cn('buttonBox')}>
              <button className={cn('button')} onClick={yesClick}>
                예
              </button>
              <button className={cn('button')} onClick={noClick}>
                아니요
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
}
