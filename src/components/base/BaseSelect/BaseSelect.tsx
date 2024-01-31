import React, { FC } from 'react';
import styles from './BaseSelect.module.css';

interface BaseSelectProps {
  value?: string;
  name?: string;
  showLabel?: boolean;
  labelText?: string;
  notification?: boolean;
  notificationText?: string;
  placeholder?: string;
  mustFilled?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  options?: { key: string | number; label: string }[];
  onChange?: (value: string) => void;
}

const BaseSelect: FC<BaseSelectProps> = ({
  onChange,
  value,
  name,
  showLabel,
  labelText,
  readOnly,
  disabled,
  notification,
  notificationText,
  placeholder,
  options,
  mustFilled,
  ...props
}) => {
  let selectClasses = readOnly ? styles.readOnlySelect : styles.select;

  if (disabled) {
    selectClasses += ` ${styles.disabledSelect}`;
  }

  if (notification) {
    selectClasses += ` ${styles.notificationSelect}`;
  }

  options = options?.map((item: any) => ({
    key: item.id || item.key,
    label: item.name || item.label,
  }));

  return (
    <>
      {showLabel && (
        <label className={`${styles['select-title']} caseon`}>
          {labelText}
          {mustFilled && <span className={styles['mustFilled']}> *</span>}
        </label>
      )}
      <select
        id="countries"
        value={value}
        name={name}
        className={selectClasses}
        onChange={(e: any) => {
          if (onChange) {
            onChange(e);
          }
        }}
      >
        <option key={0} value="">
          აირჩიე
        </option>
        {options?.map((e, key) => {
          return (
            <option key={key} value={e.key}>
              {e.label}
            </option>
          );
        })}
      </select>
      {notification && (
        <p className={styles['notificationlable']}>
          <img className="pr-[12px]" src="/assets/Vector.svg" alt="warn" />
          <span>{notificationText}</span>
        </p>
      )}
    </>
  );
};

export default BaseSelect;
