import { rightSideBarToggleModal } from '@app/redux';
import { useDispatch } from 'react-redux';

const BaseSidebarClose = ({ data }: any) => {
  const dispatch = useDispatch();

  return (
    <div className="flex overflow-hidden pb-[22px] items-center relative w-full border border-transparent border-b-gray-200">
      <img
        onClick={() => {
          dispatch(rightSideBarToggleModal());
        }}
        className="absolute cursor-pointer left-[16px]"
        src="/assets/sidebarprofileclose.svg"
        alt="close"
      />
      <h1 className="text-center mx-auto text-sm">
        {data?.name || ''} {data?.lastName || 'სისტემური როლი'}
      </h1>
    </div>
  );
};

export default BaseSidebarClose;
