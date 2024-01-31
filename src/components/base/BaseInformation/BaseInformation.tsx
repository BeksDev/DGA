'use client';
import { useState } from 'react';
import { BaseButton, BaseInput } from '@components/base';
import styles from './BaseInformation.module.css';

interface BaseInformationItem {
  img?: string;
  text?: string;
  inputlabeltext?: string;
  inputplaceholdertext?: string;
}

interface BaseInformationProps {
  label?: string;
  contact?: boolean;
  data?: BaseInformationItem[];
}

const BaseInformation: React.FC<BaseInformationProps> = ({ label, data = [], contact }) => {
  const [selected, setSelected] = useState<Number | null>(null);
  const [selectedEdit, setSelectedEdit] = useState<Number | null>(null);
  return (
    <div>
      <div className={styles.baseInformationWrapper}>
        <div className={styles.spanWrapper}>
          <span className={`${styles.span} caseon`}>{label}</span>
        </div>
        <div className={styles.contactWrapper}>
          {!contact && (
            <ul>
              {data?.map((item, key) => (
                <li key={key} className={styles.liStyles}>
                  <img src={item.img} alt={item.text} />
                  <span className={styles.liSpan}>{item.text}</span>
                </li>
              ))}
            </ul>
          )}
          {contact && (
            <ul>
              {data?.map((item, key) => (
                <li
                  onMouseEnter={() => setSelected(key)}
                  onMouseLeave={() => setSelected(null)}
                  key={key}
                  className={`${styles.contact} ${key !== selectedEdit ? 'hover:bg-blue-100' : ''}`}
                >
                  {key !== selectedEdit && (
                    <>
                      <img
                        className={`${selected === key ? 'w-[18px] h-[18px]' : ''}`}
                        src={item.img}
                        alt={item.text}
                      />
                      <span className={styles.contactSpan}>{item.text}</span>
                      <img
                        onClick={() => {
                          setSelectedEdit(key);
                        }}
                        className={`${selected !== key ? 'hidden' : ''}  absolute right-[12px]`}
                        src="/assets/pencil.svg"
                        alt="edit"
                      />
                    </>
                  )}
                  {key === selectedEdit && (
                    <div className="w-full">
                      <BaseInput showLabel labelText={item.inputlabeltext} placeholder={item.inputplaceholdertext} />
                      <div className={styles.buttonWrapper}>
                        <BaseButton variant="profileeditclose" onClick={() => setSelectedEdit(null)}>
                          გაუქმება
                        </BaseButton>
                        <BaseButton variant="profileeditsave">შენახვა</BaseButton>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default BaseInformation;
