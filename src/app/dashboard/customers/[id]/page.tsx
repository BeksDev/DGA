'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@app/redux';
import { BaseUpload } from '@components/base';
import { ProfileInfo, RightSideBarRoleSystem } from '@components/page';
import { useCustomer, useRole } from '@/hooks';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function Page() {
  const { id } = useParams();
  const { isRightSideBar } = useSelector((state: RootState) => state.modal);

  const { loading, customer, viewData: viewCustomerData } = useCustomer();
  const { data: roles, getData: getRoleData } = useRole();
  useEffect(() => {
    viewCustomerData(id);
    getRoleData();
  }, [id]);

  return (
    <>
      <div className="h-full flex space-x-2">
        <main className="bg-white h-full w-full rounded-[10px]">
          <ProfileInfo data={customer} />
        </main>
        <aside
          className={`${
            isRightSideBar ? 'w-[480px]' : 'w-[0px]'
          } transition-all duration-300 max-x-[480px] overflow-hidden bg-white rounded-[10px]`}
        >
          <RightSideBarRoleSystem data={customer} roles={roles} />
        </aside>
      </div>
    </>
  );
}
