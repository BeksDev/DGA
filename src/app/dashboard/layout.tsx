'use client';

import { useAuth } from '@app/hooks';
import { BaseLoading, BaseUpload } from '@components/base';
import { CustomerAdd, Navigation, SideBar } from '@components/page';
import { useEffect } from 'react';

export default function LayoutDashboard({ children }: { children: React.ReactNode }) {
  const { loadingAuthSession, validateAuthToken } = useAuth();

  useEffect(() => {
    validateAuthToken();
  });

  return (
    <>
      {!loadingAuthSession ? (
        <BaseLoading classes={'mt-[120px]'} />
      ) : (
        <div className="h-screen grid overflow-hidden grid-cols-[80px_auto_auto] grid-rows-[66px_auto_auto] bg-gray-100">
          <BaseUpload />
          <aside className=" row-span-3 p-2.5 z-10">
            <SideBar />
          </aside>
          <nav className=" col-start-2 col-span-2 row-start-1 pt-[10px]">
            <Navigation />
          </nav>
          <main className=" col-start-2 col-span-2 row-start-2 row-span-2 pl-2 pt-2 pr-4 pb-3">{children}</main>
        </div>
      )}
    </>
  );
}
