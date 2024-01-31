'use client';

import { useState } from 'react';
import {
  BaseActiveInactive,
  BaseButton,
  BaseInformation,
  BaseLoading,
  BaseProfilePictureWithRedact,
} from '@components/base';

const BaseProfileRightSide = ({ data: customer, agencies, loading }: any) => {
  const [tabs, setTabs] = useState(false);

  return (
    <div>
      {!tabs && (
        <>
          <div className="relative">
            {loading ? (
              <BaseLoading classes={'mt-10'} />
            ) : (
              <>
                <BaseProfilePictureWithRedact rightSideProfile data={customer} />
                <div>
                  <BaseInformation
                    contact
                    label="პირადი ინფორმაცია"
                    data={[
                      {
                        img: '/assets/face.svg',
                        text: customer?.gender,
                      },
                      {
                        img: '/assets/pn.svg',
                        text: customer?.ident,
                      },
                      {
                        img: '/assets/business.svg',
                        text: agencies?.filter((e: any) => e.id == customer?.agency)?.[0]?.name,
                      },
                      {
                        img: '/assets/work.svg',
                        text: customer?.position,
                      },
                    ]}
                  />
                  <BaseInformation
                    contact
                    label="საკონტაქტო ინფორმაცია"
                    data={[
                      {
                        img: '/assets/mail.svg',
                        text: customer?.email,
                        inputlabeltext: 'მიუთითე ახალი ელ ფოსტა',
                        inputplaceholdertext: 'ელ ფოსტა',
                      },
                      {
                        img: '/assets/phone.svg',
                        text: customer?.phone,
                        inputlabeltext: 'მიუთითე ახალი ნომერი',
                        inputplaceholdertext: 'ნომერი',
                      },
                    ]}
                  />
                </div>
                <div className="w-full px-[8px]">
                  <BaseButton onClick={() => setTabs(true)} variant="tab">
                    ჩანართის როლი
                    <img src="/assets/rightarrow.svg" alt="arrow" />
                  </BaseButton>
                </div>
              </>
            )}
          </div>
        </>
      )}
      {tabs && (
        <div className="w-full flex flex-col space-y-2">
          <div className="border-b border-gray-200">
            <div className="px-[8px]">
              <BaseButton onClick={() => setTabs(false)} variant="tabback">
                <img className="rotate-180 mr-2" src="/assets/rightarrow.svg" alt="arrow" />
                ჩანართის როლი
              </BaseButton>
            </div>
          </div>
          <div className="px-[8px] flex flex-col space-y-2">
            <BaseActiveInactive active code="კოდი" level="დონე" rolename="ადმინისტრატორი" />
            <BaseActiveInactive code="კოდი" level="დონე" rolename="ვიუერი" />
          </div>
        </div>
      )}
    </div>
  );
};

export default BaseProfileRightSide;
