'use client';

import React, { FC, useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { searchToggleModal } from '@app/redux';
import { SearchComponent } from '../../page';

interface BaseSearchProps {
  onChange?: (value: string) => void;
  onFilterUpdate?: (value: string) => void;
}

const BaseSearch: FC<BaseSearchProps> = ({ onChange, onFilterUpdate }) => {
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState<string>('');
  const [focused, setFocused] = useState<boolean>(false);
  const [search, setSearch] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const clearInput = () => {
    setInputValue('');
    setSearch(false);
    if (onChange) {
      onChange('');
    }
  };

  const searchIconSrc = '/assets/search.svg';
  const closeIconSrc = '/assets/closesearch.svg';
  const searchParam = '/assets/searchparam.svg';

  return (
    <div className="relative">
      <div
        className={`${
          search ? 'border border-gray-200 w-72' : 'w-[60px]'
        } px-3 max-w-[300px] relative rounded-md flex items-center transition-all overflow-hidden ${
          focused ? 'ring ring-blue-300 border-gray-100' : ''
        }`}
      >
        <img className="cursor-pointer w-5 h-5" onClick={() => setSearch(true)} src={searchIconSrc} alt="Search Icon" />
        <input
          className={`p-2 w-full outline-none text-sm ${search ? '' : 'bg-white'}`}
          type="text"
          placeholder="ძებნა"
          disabled={!search}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={inputValue}
          onChange={handleInputChange}
        />
        <div className="flex items-center  w-10 justify-end space-x-3">
          {search && <img className="cursor-pointer" src={closeIconSrc} alt="Clear Search" onClick={clearInput} />}
          <img
            className="cursor-pointer"
            onClick={() => dispatch(searchToggleModal())}
            src={searchParam}
            alt="Search Icon"
          />
        </div>
      </div>
      <div
        className={`h-auto absolute top-0 left-0 shadow-lg rounded-[8px] transition-all overflow-hidden bg-transparent z-10`}
      >
        <SearchComponent
          onFilterUpdate={(e: any) => {
            if (onFilterUpdate) {
              onFilterUpdate(e);
            }
          }}
        />
      </div>
    </div>
  );
};

export default BaseSearch;
