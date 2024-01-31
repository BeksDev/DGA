'use client';
import { FC, useState } from 'react';
import { BaseButton } from '..';
import { rightSideBarToggleModal, uploadOpenToggleModal } from '@app/redux';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
interface BaseProfilePictureWithRedactProps {
  rightSideProfile?: boolean;
  customerAdd?: boolean;
  data?: any;
}

const BaseProfilePictureWithRedact: FC<BaseProfilePictureWithRedactProps> = ({
  rightSideProfile,
  data,
  customerAdd,
}) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      {!rightSideProfile && !customerAdd && (
        <div className="flex pt-[22px] space-x-[18px] relative">
          <Link href={'/dashboard/customers?title=მომხმარებლები'}>
            <img src="/assets/closebutton.svg" className="absolute right-2 top-1 cursor-pointer" alt="close" />
          </Link>
          <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            <img
              className="inline-block h-[68px] w-[68px] cursor-pointer rounded-full ring-2 ring-white"
              src="/assets/avatar.svg"
              alt=""
            />
            <div
              className={`${
                !show ? 'hidden' : ''
              } max-w-[55px] absolute bottom-[-8px] left-[10px] bg-gray-100 px-[10px] py-[7px] flex items-center justify-center space-x-2 rounded-[50px]`}
            >
              <img
                onClick={() => dispatch(uploadOpenToggleModal())}
                src="/assets/pencil.svg"
                className="cursor-pointer w-6"
                alt="pencil"
              />
              <img src="/assets/garbage.svg" className="cursor-pointer w-6" alt="pencil" />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <span className="text-black font-medium text-[16px]">
              {data?.name || ''} {data?.lastName || ''}
            </span>
            <BaseButton onClick={() => dispatch(rightSideBarToggleModal())} variant="profileedit">
              ექსპერტი
              <img className="ml-[10px]" src="/assets/pencil.svg" alt="edit" />
            </BaseButton>
          </div>
        </div>
      )}
      {rightSideProfile && (
        <div className="flex p-[22px] space-x-[18px]">
          <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="/assets/avatar.svg" alt="" />
          <div>
            <Link
              href={`/dashboard/customers/${data?.id}?title=მომხმარებლები`}
              onClick={() => dispatch(rightSideBarToggleModal())}
            >
              <BaseButton variant="profileedit">
                {data?.position || ''}
                <img className="ml-[10px]" src="/assets/pencil.svg" alt="edit" />
              </BaseButton>
              <span className="px-3 text-blue-500 text-[12px] caseon">პროფილის ნახვა</span>
            </Link>
          </div>
        </div>
      )}
      {customerAdd && (
        <div className="flex relative">
          <div className="relative" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            <img
              className="inline-block h-[68px] w-[68px] cursor-pointer rounded-full ring-2 ring-white"
              src="/assets/avatar.svg"
              alt="avatar"
            />
            <div
              className={`${
                !show ? 'hidden' : ''
              } max-w-[55px] absolute bottom-[-8px] left-[18px] bg-gray-100 px-[10px] py-[7px] flex items-center justify-center space-x-2 rounded-[50px]`}
            >
              <img
                onClick={() => dispatch(uploadOpenToggleModal())}
                src="/assets/pencil.svg"
                className="cursor-pointer"
                alt="pencil"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BaseProfilePictureWithRedact;
