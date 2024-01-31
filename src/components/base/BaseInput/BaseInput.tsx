'use client';
import React, { FC, HTMLProps, useState } from 'react';
import styles from './BaseInput.module.css';

interface BaseInputProps extends HTMLProps<HTMLInputElement> {
  showLabel?: boolean;
  name?: string;
  labelText?: string;
  notification?: boolean;
  notificationText?: string;
  mustFilled?: boolean;
}

const BaseInput: FC<BaseInputProps> = ({
  type = 'text',
  name,
  placeholder,
  showLabel,
  labelText,
  readOnly,
  disabled,
  notification,
  notificationText,
  mustFilled,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  let inputClassName = `${readOnly ? styles.readOnlyInput : styles.input}`;
  inputClassName += `${disabled ? ` ${styles.disabledInput}` : ''}`;
  inputClassName += `${notification ? ` ${styles.notificationInput}` : ''}`;
  inputClassName += `${isFocused ? ` ${styles.lastActive}` : ''}`;

  const handleBlur = () => {
    setIsFocused(true);
  };
  if (disabled) {
    inputClassName += ` ${styles.disabledInput}`;
  }
  if (notification) {
    inputClassName += ` ${styles.notificationInput}`;
  }
  return (
    <div className="relative w-full">
      {showLabel && (
        <label className={`${styles['input-title']} caseon`}>
          {labelText}
          {mustFilled && <span className={styles['mustFilled']}> *</span>}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={inputClassName}
        disabled={disabled}
        readOnly={readOnly}
        name={name}
        onBlur={handleBlur}
        {...props}
      />
      {notification && (
        <p className={styles['notificationlable']}>
          <img className="pr-[12px]" src="assets/Vector.svg" alt="warn" />
          <span>{notificationText}</span>
        </p>
      )}
    </div>
  );
};

export default BaseInput;
