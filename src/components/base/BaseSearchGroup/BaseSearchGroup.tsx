import React from 'react';
import { BaseButton } from '..';

interface BaseSearchGroupProps {
  data?: object;
}

const BaseSearchGroup: React.FC = ({ data }: BaseSearchGroupProps) => {
  return (
    <div className="bg-blue-600 max-h-12 h-12 flex items-center justify-between px-5">
      <div className="flex items-center">
        <span className="text-white text-[12px]">რეზულტატი</span>
      </div>
      <div className="flex space-x-3 items-center">
        <ul className="flex space-x-3">
          <li className="flex px-1.5 py-[2px] space-x-1 rounded-[4px] bg-blue-500">
            <span className="text-white text-[12px]">აბრამიშვილი</span>
            <img className="cursor-pointer" src="/assets/groupclose.svg" alt="close" />
          </li>
        </ul>
        <BaseButton variant="groupdelete">გაუქმება</BaseButton>
      </div>
    </div>
  );
};

export default BaseSearchGroup;
