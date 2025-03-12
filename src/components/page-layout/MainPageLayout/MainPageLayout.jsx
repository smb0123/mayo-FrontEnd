'use client';
import classNames from 'classnames/bind';

import styles from '@/components/page-layout/MainPageLayout/MainPageLayout.module.scss';

import Logo from '@/icons/logo.svg';
import GoogleLogo from '@/icons/goolge.svg';
import AppleLogo from '@/icons/apple.svg';

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  OAuthProvider,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import { auth } from '@/utils/firebase/firebase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axiosInstance from '@/apis/axiosInstance';
import ROUTE from '@/constants/route';
import { useStoreId } from '@/store/useStoreId';

const cn = classNames.bind(styles);

export default function MainPageLayout() {
  const { setStoreId } = useStoreId();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkUserPermissions = async () => {
    try {
      const { data } = await axiosInstance.get('user');
      const userData = data;

      if (!userData.storeRef || userData.isManager === false) {
        throw new Error();
      }

      setStoreId(userData.storeRef);

      alert('로그인에 성공하였습니다.');
      router.push(ROUTE.In_Progress);
    } catch (error) {
      alert(error.response?.data?.message || '권한이 없거나 가게 정보가 설정되지 않았습니다.');
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      localStorage.setItem('token', token);
      await checkUserPermissions();
    } catch (error) {
      alert('Google 로그인에 실패하였습니다. 다시 시도해주세요.');
    }
  };

  const handleAppleLogin = async () => {
    const provider = new OAuthProvider('apple.com');
    provider.addScope('email');
    provider.addScope('name');

    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      localStorage.setItem('token', token);
      await checkUserPermissions();
    } catch (error) {
      alert('Apple 로그인에 실패하였습니다. 다시 시도해주세요.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();
      localStorage.setItem('token', token);
      await checkUserPermissions();
    } catch (error) {
      alert('로그인에 실패하였습니다. 이메일과 비밀번호를 확인해주세요.');
    }
  };

  return (
    <div className={cn('loginContainer')}>
      <div className={cn('logoContainer')}>
        <Logo width={150} height={67} className={cn('logo')} />
        <h2 className={cn('subTitle')}>사장님용</h2>
      </div>
      <form className={cn('inputContainer')} onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          className={cn('inputField')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          className={cn('inputField')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={cn('buttonContainer')}>
          <button type="submit" className={cn('loginButton')}>
            로그인
          </button>
        </div>
      </form>
      <div className={cn('socialLoginContainer')}>
        <button className={cn('googleButton')} onClick={handleGoogleLogin}>
          <GoogleLogo className={cn('icon')} />
          Google 로그인
        </button>
        <button className={cn('appleButton')} onClick={handleAppleLogin}>
          <AppleLogo className={cn('icon')} />
          애플 로그인
        </button>
      </div>
    </div>
  );
}
