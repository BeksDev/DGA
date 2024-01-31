'use client';
import { BaseButton, BaseInput, BaseSelect } from '../../base';
import { useDispatch, useSelector } from 'react-redux';
import { searchToggleModal } from '@app/redux';
import { Fragment, useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import { RootState } from '@app/redux';
import { useAgency, useRole } from '@/hooks';

const inputInitialValues = {
  name: '',
  lastName: '',
  agency: '',
  position: '',
  email: '',
  phone: '',
};

const SearchComponent: React.FC<any> = ({ onFilterUpdate }: any) => {
  const dispatch = useDispatch();
  const { isOpenSearch } = useSelector((state: RootState) => state.modal);

  const { data: agencies, getData: getAgencyData } = useAgency();
  const { data: roles, getData: getRoleData } = useRole();

  useEffect(() => {
    getAgencyData();
    getRoleData();
  }, []);

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
    <Transition
      as={Fragment}
      show={isOpenSearch}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <div className="w-[412px] max-w-[412px] p-6 rounded-t-none bg-white">
        <img
          className="absolute top-[8px] right-[8.5px] cursor-pointer"
          src="/assets/ic_close.svg"
          alt="close"
          onClick={() => dispatch(searchToggleModal())}
        />
        <div className="mb-[12px]">
          <BaseInput
            showLabel
            labelText="სახელი"
            placeholder="ჩაწერეთ სახელი"
            value={inputValues?.name}
            onChange={(e: any) => handleFilterUpdate({ name: e?.target?.value })}
          />
        </div>
        <div className="mb-[12px]">
          <BaseInput
            showLabel
            labelText="გვარი"
            placeholder="ჩაწერეთ გვარი"
            value={inputValues?.lastName}
            onChange={(e: any) => handleFilterUpdate({ lastName: e?.target?.value })}
          />
        </div>
        <div className="mb-[12px]">
          <BaseSelect
            options={agencies}
            placeholder="უწყება"
            showLabel
            labelText="აირჩიეთ უწყება"
            value={inputValues?.agency}
            onChange={(e: any) => handleFilterUpdate({ agency: e?.target?.value })}
          />
        </div>
        <div className="mb-[12px]">
          <BaseInput
            showLabel
            labelText="თანამდებობა"
            placeholder="ჩაწერეთ თანამდებობა"
            value={inputValues?.position}
            onChange={(e: any) => handleFilterUpdate({ position: e?.target?.value })}
          />
        </div>
        <div className="mb-[24px]">
          <BaseSelect
            options={roles}
            placeholder="როლი"
            showLabel
            labelText="აირჩიეთ სისტემური როლი"
            value={inputValues?.role}
            onChange={(e: any) => handleFilterUpdate({ role: e?.target?.value })}
          />
        </div>
        <div className="flex items-center justify-end">
          <BaseButton
            variant="clear"
            onClick={() => {
              handleFilterUpdate(inputInitialValues);
              dispatch(searchToggleModal());
            }}
          >
            გასუფთავება
          </BaseButton>
          <BaseButton onClick={() => dispatch(searchToggleModal())}>ძებნა</BaseButton>
        </div>
      </div>
    </Transition>
  );
};

export default SearchComponent;
