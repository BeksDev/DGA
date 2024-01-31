import { RootState } from '@app/redux';
import { useSelector } from 'react-redux';

import { RightSideBarProfile, TableSearch } from '..';

const Table: React.FC = () => {
  const { isRightSideBar } = useSelector((state: RootState) => state.modal);
  return (
    <div className="h-full flex space-x-2">
      <main className="bg-white h-full w-full rounded-[10px]">
        <TableSearch />
      </main>
      <aside
        className={`${
          isRightSideBar ? 'w-[480px]' : 'w-[0px]'
        } transition-all duration-300 max-x-[480px] overflow-hidden bg-white rounded-[10px]`}
      >
        <RightSideBarProfile />
      </aside>
    </div>
  );
};

export default Table;
