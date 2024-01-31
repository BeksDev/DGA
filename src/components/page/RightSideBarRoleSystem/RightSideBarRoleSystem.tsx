import { BasePosition, BaseSidebarClose } from '@components/base';

const RightSideBarRoleSystem = ({ data, roles }: any) => {
  return (
    <div className="py-4">
      <BaseSidebarClose />
      <div className="p-3">
        {data?.role &&
          roles?.map((el: any, key: any) => (
            <div key={key}>
              <BasePosition
                mainLabel={el.name}
                isChecked={el?.id == data?.role?.id ? true : false}
                accessLabel="წვდომა ჩანართებზე"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RightSideBarRoleSystem;
