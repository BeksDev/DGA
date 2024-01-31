import React, { FC, HTMLProps } from 'react';
import styles from './BaseOperationSuccess.module.css';
import { BaseButton } from '..';

interface BaseOperationSuccessProps extends HTMLProps<HTMLInputElement> {
  success?: boolean;
  warning?: boolean;
  successText?: string;
  warningText?: string;
  deleteText?: string;
  successBtnText?: string;
  warningBtnText?: { label: string }[];
}

const BaseOperationSuccess: FC<BaseOperationSuccessProps> = ({
  success,
  warning,
  successText,
  warningText,
  deleteText,
  warningBtnText,
  successBtnText,
}) => {
  return (
    <>
      <div className={styles['warn-wrapper']}>
        <div className={styles['warn-directions']}>
          <img
            src={success ? '/assets/Shape.svg' : warning ? '/assets/warn.svg' : '/assets/delete.svg'}
            alt={success ? 'success' : warning ? 'warning' : 'delete'}
          />
          <div className="pt-6 pb-16">
            <p className={success ? `${styles['success-text']}` : `${styles['warning-text']}`}>
              {success ? successText : warning ? warningText : deleteText}
            </p>
          </div>
          {success && <BaseButton>{successBtnText}</BaseButton>}
          <div className="flex space-x-[10px]">
            {warning &&
              warningBtnText?.map((e, key) => (
                <BaseButton variant="warning" key={key}>
                  {e.label}
                </BaseButton>
              ))}
            {deleteText &&
              warningBtnText?.map((e, key) => (
                <BaseButton variant="warning" key={key}>
                  {e.label}
                </BaseButton>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BaseOperationSuccess;
