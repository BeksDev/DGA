'use client';

import { BaseProfileRightSide, BaseSidebarClose } from '../../base';

const RightSideBarProfile = ({ data, agencies, loading }: any) => {
  return (
    <>
      <div className="py-4">
        <BaseSidebarClose data={data} />
        <BaseProfileRightSide data={data} agencies={agencies} loading={loading} />
      </div>
    </>
  );
};

export default RightSideBarProfile;
