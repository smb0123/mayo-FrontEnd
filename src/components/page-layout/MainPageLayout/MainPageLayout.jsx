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
  getRedirectResult,
} from 'firebase/auth';
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import axiosInstance from '@/apis/axiosInstance';
import ROUTE from '@/constants/route';
import storeId from '@/store/useStoreId';

const cn = classNames.bind(styles);

export default function MainPageLayout() {
  const { setStoreId } = storeId();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkUserPermissions = useCallback(
    async (token) => {
      try {
        const response = await axiosInstance.get('/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const userData = response.data;

        // storeRef가 없거나 isManager가 false일 경우 로그인 실패
        if (!userData.storeRef || userData.isManager === false) {
          throw new Error('로그인에 실패하였습니다. 권한이 없거나 가게 정보가 설정되지 않았습니다.');
        }

        setStoreId(userData.storeRef);

        alert('로그인에 성공하였습니다.');
        router.push(ROUTE.In_Progress);
      } catch (error) {
        alert('로그인에 실패하였습니다. 권한이 없거나 가게 정보가 설정되지 않았습니다.');
        console.error('로그인 조건 검증 실패:', error);
      }
    },
    [router, setStoreId]
  );

  useEffect(() => {
    // 리디렉션 결과 처리
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          const token = await result.user.getIdToken();
          await checkUserPermissions(token); // 사용자 권한 검증
        }
      } catch (error) {
        console.error('리디렉션 결과 처리 중 오류 발생:', error);
      }
    };

    checkRedirectResult();
  }, [checkUserPermissions]);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      await checkUserPermissions(token); // 사용자 권한 검증
    } catch (error) {
      alert('Google 로그인에 실패하였습니다. 다시 시도해주세요.');
      console.error('Google 로그인 실패:', error);
    }
  };

  const handleAppleLogin = async () => {
    const provider = new OAuthProvider('apple.com');
    provider.addScope('email'); // 애플 로그인에서 이메일을 요청
    provider.addScope('name'); // 애플 로그인에서 이름을 요청

    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      await checkUserPermissions(token); // 사용자 권한 검증
    } catch (error) {
      alert('Apple 로그인에 실패하였습니다. 다시 시도해주세요.');
      console.error('Apple 로그인 실패:', error);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault(); // 기본 폼 제출 방지
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const token = await result.user.getIdToken();
      await checkUserPermissions(token); // 사용자 권한 검증
    } catch (error) {
      alert('로그인에 실패하였습니다. 이메일과 비밀번호를 확인해주세요.');
      console.error('이메일 로그인 실패:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleEmailLogin(e); // Enter 키를 누르면 로그인 시도
    }
  };

  return (
    <div className={cn('loginContainer')}>
      <div className={cn('logoContainer')}>
        <Logo className={cn('logo')} />
        <h2 className={cn('subTitle')}>사장님용</h2>
      </div>
      <form className={cn('inputContainer')} onSubmit={handleEmailLogin} onKeyDown={handleKeyDown}>
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
          {/* <button type="button" className={cn('registerButton')}>
            회원가입
          </button> */}
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
