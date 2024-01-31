import { useSearchParams } from 'next/navigation';
import BaseCustomSelect from '../../base/BaseCustomSelect';

const Navigation = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get('title') ?? '';

  return (
    <div className="flex justify-between items-center h-full px-6">
      <p className=" text-base font-normal caseon">{title}</p>
      <div className="flex items-center space-x-3">
        <img className="cursor-pointer" src="/assets/noti.svg" alt="" />
        <BaseCustomSelect logout />
      </div>
    </div>
  );
};

export default Navigation;
