import { useAgency } from '@/hooks';
import { BaseActiveInactive, BaseInformation, BaseLoading, BaseProfilePictureWithRedact } from '..';
import { useEffect } from 'react';

const BaseMainProfileInfo = ({ data: customer }: any) => {
  const { data: agencies, getData: getAgencyData, loading } = useAgency();

  useEffect(() => {
    getAgencyData();
  }, []);

  return (
    <>
      {loading ? (
        <tr>
          <td className="text-center">
            <BaseLoading classes={'mt-10'} />
          </td>
        </tr>
      ) : (
        <div className="px-[4px]">
          <BaseProfilePictureWithRedact data={customer}  />
          <div className="grid grid-cols-2">
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
              <div className="px-[8px]">
                <div className="pb-[12px]">
                  <BaseActiveInactive
                    active
                    code={customer?.role?.description}
                    label
                    labeltext="ჩანართი როლი"
                    rolename={customer?.role?.name}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BaseMainProfileInfo;
