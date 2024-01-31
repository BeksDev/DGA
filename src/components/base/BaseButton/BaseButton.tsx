import React, { FC, ButtonHTMLAttributes } from 'react';
import styles from './BaseButton.module.css';

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'primary'
    | 'secondary'
    | 'registration'
    | 'clear'
    | 'warning'
    | 'disabled'
    | 'add'
    | 'tablebutton'
    | 'groupdelete'
    | 'profileedit'
    | 'profileeditclose'
    | 'profileeditsave'
    | 'tab'
    | 'tabback'
    | 'archive';
}

const BaseButton: FC<BaseButtonProps> = ({ variant = 'primary', className, ...props }) => {
  const baseClasses = 'py-2 px-4 rounded focus:outline-none';
  const variantClasses = styles[variant] || '';
  const combinedClasses = `${baseClasses} ${variantClasses} ${className || ''} caseon`;

  return <button className={combinedClasses} {...props} />;
};

export default BaseButton;
