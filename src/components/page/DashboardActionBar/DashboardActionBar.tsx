import { BaseButton, BaseCustomSelect } from '@/components';
import { tabAddOpenToggleModal } from '@app/redux';
import { useDispatch } from 'react-redux';

const DashboardActionBar = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex space-x-3">
        <BaseButton variant="tablebutton" onClick={() => dispatch(tabAddOpenToggleModal())}>
          ახალი ჩანართი
        </BaseButton>
        <BaseButton variant="archive" onClick={() => dispatch(tabAddOpenToggleModal())}>
          არქივში დამატება
        </BaseButton>
      </div>
      <div>
        <BaseCustomSelect filter />
      </div>
    </>
  );
};

export default DashboardActionBar;
