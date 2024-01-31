'use client';

import { BaseButton, BaseCheckBox, BaseInput, BasePictureUpload, BaseSelect } from '../../base';

import { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@app/redux';
import { toggleModal } from '@app/redux';
import { useAgency, useCustomer, useRole } from '@/hooks';

interface CustomerAddProps {
  onDataAdd?: () => any;
}

const CustomerAdd: React.FC<any> = ({ onDataAdd }: CustomerAddProps) => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.modal);

  const { setAvatar, createData: createCustomerData } = useCustomer();
  const [customerData, setCustomerData] = useState<any>();

  const { data: agencies, getData: getAgencyData } = useAgency();
  const { data: roles, getData: getRoleData } = useRole();

  useEffect(() => {
    getAgencyData();
    getRoleData();
  }, []);

  const updateCustomerState = (e: any) => {
    const { name } = e?.target || {};

    setCustomerData((prevState: any) => ({
      ...prevState,
      [name]: e?.target?.value,
    }));
  };

  const onCreateCustomerData = () => {
    createCustomerData(customerData);

    if (onDataAdd) {
      setTimeout(() => {
        onDataAdd();
      }, 500);
    }
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => dispatch(toggleModal())}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative  transform overflow-hidden rounded-[10px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[799px]">
                <img
                  className="absolute top-[14px] right-[10px] cursor-pointer"
                  src="/assets/ic_close.svg"
                  alt="close"
                  onClick={() => dispatch(toggleModal())}
                />
                <div className="mb-6 p-4 flex items-center justify-center border-b">
                  <h1 className="text-[#334870] text-sm font-semibold caseon">მომხმარებლის დამატება</h1>
                </div>

                <div className="flex space-x-6 px-6 pb-4 ">
                  <div className="w-[100%]">
                    <BaseInput
                      placeholder="ჩაწერე სახელი ქართულად"
                      showLabel
                      labelText="სახელი(ქარ)"
                      mustFilled
                      name="name"
                      value={customerData?.name}
                      onChange={updateCustomerState}
                    />
                  </div>
                  <div className="w-[100%]">
                    <BaseInput placeholder="ჩაწერე სახელი ინგლისურად" showLabel labelText="სახელი(ENG)" />
                  </div>
                </div>
                <div className="flex space-x-6 px-6 pb-4">
                  <div className="w-[100%]">
                    <BaseInput
                      placeholder="ჩაწერე გვარი ქართულად"
                      showLabel
                      labelText="გვარი(ქარ)"
                      mustFilled
                      name="lastName"
                      value={customerData?.lastName}
                      onChange={updateCustomerState}
                    />
                  </div>
                  <div className="w-[100%]">
                    <BaseInput placeholder="ჩაწერე გვარი ინგლისურად" showLabel labelText="გვარი(ENG)" />
                  </div>
                </div>
                <div className="flex space-x-6 px-6 pb-4">
                  <div className="w-[100%]">
                    <BaseInput
                      placeholder="ჩაწერე პირადი ნომერი"
                      showLabel
                      labelText="პირადი ნომერი"
                      mustFilled
                      name="ident"
                      value={customerData?.ident}
                      onChange={updateCustomerState}
                    />
                  </div>
                  <div className="w-[100%]">
                    <BaseSelect
                      options={[
                        { key: 'მამრობითი', label: 'მამრობითი' },
                        { key: 'მდედრობითი', label: 'მდედრობითი' },
                      ]}
                      showLabel
                      mustFilled
                      labelText="სქესი"
                      name="gender"
                      value={customerData?.gender}
                      onChange={updateCustomerState}
                    />
                  </div>
                </div>
                <div className="flex space-x-6 px-6 pb-4">
                  <div className="w-[100%]">
                    <BaseSelect
                      options={agencies}
                      showLabel
                      mustFilled
                      labelText="უწყება"
                      name="agency"
                      value={customerData?.agency}
                      onChange={updateCustomerState}
                    />
                  </div>
                  <div className="w-[100%]">
                    <BaseSelect
                      options={roles}
                      showLabel
                      mustFilled
                      labelText="როლი"
                      name="role"
                      value={customerData?.role}
                      onChange={updateCustomerState}
                    />
                  </div>
                </div>
                <div className="flex space-x-6 px-6 pb-4">
                  <div className="w-[100%]">
                    <BaseInput
                      showLabel
                      placeholder="თანამდებობა"
                      labelText="თანამდებობა"
                      mustFilled
                      name="position"
                      value={customerData?.position}
                      onChange={updateCustomerState}
                    />
                  </div>
                  <div className="w-[100%]">
                    <BaseInput showLabel placeholder="თანამდებობა (ENG)" labelText="თანამდებობა(ENG)" />
                  </div>
                </div>
                <div className="flex space-x-6 px-6 pb-4">
                  <div className="w-[100%]">
                    <BaseInput
                      placeholder="ჩაწერე ელ.ფოსტა"
                      showLabel
                      labelText="ელ.ფოსტა"
                      mustFilled
                      name="email"
                      value={customerData?.email}
                      onChange={updateCustomerState}
                    />
                  </div>
                  <div className="w-[100%]">
                    <BaseInput
                      placeholder="ჩაწერე მობილური"
                      showLabel
                      labelText="მობილური"
                      mustFilled
                      name="phone"
                      value={customerData?.phone}
                      onChange={updateCustomerState}
                    />
                  </div>
                </div>
                <div className=" space-x-6 px-6 pb-4 ">
                  <BasePictureUpload
                    onChange={(e: any) => setAvatar(e?.target?.files?.[0])}
                    type="file"
                    value={customerData?.file}
                    name="file"
                  />
                </div>
                <div className="flex space-x-6 items-center justify-end p-4 border-t">
                  <BaseCheckBox label="მომდევნოს დამატება" />
                  <BaseButton
                    onClick={() => {
                      onCreateCustomerData();
                      dispatch(toggleModal());
                    }}
                  >
                    შენახვა
                  </BaseButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CustomerAdd;
