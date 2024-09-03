import styles from '@/app/(Layout)/my-page/customer-center/page.module.scss';
import Logo from '@/icons/logo.svg';
import Link from 'next/link';

export default function customer_center() {
  return <div className={styles.container}>
    <div className={styles.content}>
    <div className={styles.mainContent}>
          <Logo height={170} width={170} className={styles.logoImage}  />
          <p>불편한 점이 있으신가요?</p>
          <p>운영 시간: 평일 09시 ~ 18시(공휴일 제외)</p>
          <Link href="http://pf.kakao.com/_pxojzxj">
            <button className={styles.chatButton}>마요 카카오톡 채널</button>
          </Link>
          <Link href="/my-page">
            <button className={styles.exitButton}>뒤로가기</button>
          </Link>
          
        </div>
      </div>
  </div>;
}