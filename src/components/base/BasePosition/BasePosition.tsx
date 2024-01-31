'use client';

import React, { useState } from 'react';
import styles from './BasePosition.module.css';

interface BasePositionProps {
  mainLabel?: string;
  accessLabel?: string;
  isChecked?: boolean;
}

const BasePosition: React.FC<BasePositionProps> = ({ mainLabel, accessLabel, isChecked }) => {
  const [checked, setChecked] = useState(isChecked ? true : false);

  return (
    <div className={`${styles.checkWrapper} ${checked ? styles.check : 'border-transparent'}`}>
      <div className="flex items-center justify-between">
        <p className={`text-base ${checked ? 'text-blue-800' : 'text-gray-700 '}`}>{mainLabel}</p>
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" className="hidden" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          <span className="relative">
            <span
              className={`block w-[16px] h-[16px] rounded-full border ${
                checked ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'
              }`}
            ></span>
            {checked && (
              <svg
                className="w-[10px] h-[10px] text-white pointer-events-none absolute inset-0 m-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            )}
          </span>
        </label>
      </div>
      <p className={` text-[14px] ${checked ? 'text-blue-500' : 'text-gray-500'}`}>{accessLabel}</p>
    </div>
  );
};

export default BasePosition;
