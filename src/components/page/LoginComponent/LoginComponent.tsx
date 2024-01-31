'use client';
import { useState } from 'react';
import { BaseButton, BaseCheckBox, BaseInput } from '@components/base';
import { useAuth } from '@app/hooks';
import styles from './LoginComponent.module.css';

const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  const auth = useAuth();

  return (
    <div className={styles['login-wrapper']}>
      <div className={styles['text-wrapper']}>
        <img src="/assets/Login.svg" alt="Login" />
        <h1 className={`${styles['login-title']} caseon`}>სახელით და პაროლით</h1>
        <p className={styles['login-paragraph']}>ავტორიზაციისთვის გთხოვთ გამოიყენოთ თქვენი MY.GOV.GE_ის ანგარიში</p>
      </div>

      <div>
        <div className="mb-[24px]">
          <BaseInput
            showLabel
            labelText="მომხარებელი"
            placeholder="ელ.ფოსტა ან მობილური"
            notification={auth.authError?.error}
            notificationText={auth.authError?.message}
            onChange={(e: any) => auth.updateAuthState({ username: e.target?.value })}
          />
        </div>
        <div className="mb-[8px]">
          <BaseInput
            type={showPassword ? 'text' : 'password'}
            showLabel
            labelText="პაროლი"
            placeholder="პაროლი"
            onChange={(e: any) => auth.updateAuthState({ password: e.target?.value })}
          />
        </div>
      </div>
      <div className={styles['login-checkbox-wrapper']}>
        <BaseCheckBox onChange={() => setShowPassword(!showPassword)} label="მაჩვენე პაროლი" />
        <a className={styles['login-forgot-password']} href="#">
          დაგავიწყდა პაროლი?
        </a>
      </div>
      <div className={styles['login-button-wrapper']}>
        <BaseButton variant="registration">რეგისტრაცია</BaseButton>
        <BaseButton onClick={() => auth.signIn()}>შესვლა</BaseButton>
      </div>
    </div>
  );
};

export default LoginComponent;
