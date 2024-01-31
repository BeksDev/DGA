'use client';

import { useAuth } from '@/hooks';
import { LoginComponent } from '@components/page';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const router = useRouter();
  const { validateAuthToken, loadingAuthSession } = useAuth();

  useEffect(() => {
    if (validateAuthToken()) {
      router.push('/dashboard/customers');
    }
  }, []);

  return (
    <>
      <nav className="h-[72px] p-[24px] flex items-center justify-between">
        <h1 className="  font-bold text-lg cursor-pointer">MY.GOV.GE</h1>
        <ul className="flex  text-sm font-normal px-[16px]">
          <li className="pr-[24px]">
            <select className="focus:outline-none cursor-pointer">
              <option value="ქართული">ქართული</option>
              <option value="ინგლისური">ინგლისური</option>
            </select>
          </li>
          <li>
            <a href="#">დახმარება</a>
          </li>
        </ul>
      </nav>
      <div className="flex flex-col  max-w-[451px] mx-auto bg-white mt-[80px]">
        <h1 className="text-center font-semibold text-base mb-6 caseon">ავტორიზაცია</h1>
        <LoginComponent />
      </div>
    </>
  );
}
