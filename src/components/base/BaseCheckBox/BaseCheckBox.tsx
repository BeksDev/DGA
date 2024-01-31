import React, { ChangeEvent } from 'react';
import styles from './BaseCheckBox.module.css';

interface CheckboxProps {
  type?: string;
  label?: string;
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const BaseCheckBox: React.FC<CheckboxProps> = ({ type = 'checkbox', label, checked, onChange }) => {
  return (
    <div className={styles.checkBoxWrapper}>
      <input type={type} className={styles.baseCheckBox} checked={checked} onChange={onChange} />
      <span className={styles.span}>{label}</span>
    </div>
  );
};

export default BaseCheckBox;
