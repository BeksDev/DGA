'use client';

import { BaseButton, BaseInput, BaseSelect } from '@/components';
import { useState } from 'react';
interface DashboardSearchProps {
  documentLevels?: [];
  onChange?: (value: string) => void;
  onFilterUpdate?: (value: string) => void;
}
const inputInitialValues = {
  name: '',
  namecode: '',
  documentlevel: '',
};

const DashboardSearch: React.FC<DashboardSearchProps> = ({ documentLevels, onFilterUpdate }) => {
  const [inputValues, setInputValues] = useState<any>(inputInitialValues);
  const handleFilterUpdate = (newState: any) => {
    let temp_state = {
      ...inputValues,
      ...newState,
    };

    setInputValues(temp_state);

    if (onFilterUpdate) {
      onFilterUpdate(temp_state);
    }
  };

  return (
    <div className="rounded-[10px] p-[16px]">
      <h1 className="text-sm caseon text-gray-500 font-bold mb-[24px]">ძებნა</h1>
      <div className="mb-[12px]">
        <BaseInput
          placeholder="ჩაწერე სახელი"
          showLabel
          labelText="სახელწოდება"
          value={inputValues?.name}
          onChange={(e: any) => handleFilterUpdate({ name: e?.target?.value })}
        />
      </div>
      <div className="mb-[12px]">
        <BaseInput
          placeholder="ჩაწერე სახელი"
          showLabel
          labelText="NAMECODE"
          value={inputValues?.name_code}
          onChange={(e: any) => handleFilterUpdate({ name_code: e?.target?.value })}
        />
      </div>
      <div className="mb-[24px]">
        <BaseSelect
          value={inputValues?.document_level_id}
          options={documentLevels}
          onChange={(e: any) => handleFilterUpdate({ document_level_id: e?.target?.value })}
          showLabel
          labelText="დოკუმენტის დონე"
        />
      </div>
      <div className="flex justify-end">
        <BaseButton variant="clear">გასუფთავება</BaseButton>
        <BaseButton variant="archive">ძებნა</BaseButton>
      </div>
    </div>
  );
};

export default DashboardSearch;
