'use client';

import { useDispatch, useSelector } from 'react-redux';
import { BaseButton, BaseCustomSelect, BaseLoading, BaseSearch } from '@components/base';
import { useEffect } from 'react';
import { RootState, toggleModal } from '@app/redux';
import { useAgency, useCustomer, useRole } from '@app/hooks';
import { CustomerAdd, RightSideBarProfile } from '@components/page';

const TableSearch = () => {
  const dispatch = useDispatch();
  const { isRightSideBar } = useSelector((state: RootState) => state.modal);

  const {
    initalSearchValues,
    search,
    updateSearch,
    loading,
    loadingView,
    customer,
    data: customers,
    getData: getCustomerData,
    viewData: viewCustomerData,
    deleteData: deleteCustomerData,
  } = useCustomer();

  const { data: agencies, getData: getAgencyData } = useAgency();
  const { data: roles, getData: getRoleData } = useRole();
  useEffect(() => {
    getAgencyData();
    getRoleData();
  }, []);

  useEffect(() => {
    getCustomerData();
  }, [search]);

  let isAnyFieldFilled = false;

  for (const key in search) {
    if (search[key].trim() !== '') {
      isAnyFieldFilled = true;
      break;
    }
  }

  return (
    <>
      <div className={`flex space-x-2 w-full relative`}>
        <div className={`bg-white rounded-[10px] w-full`}>
          <CustomerAdd
            onDataAdd={() => {
              setTimeout(() => {
                getCustomerData();
              }, 500);
            }}
          />
          <div
            className={`transition-all px-4 py-2.5 flex bg-white rounded-[10px] ${
              !isAnyFieldFilled ? 'space-x-4' : ''
            }`}
          >
            <div className={`transition-all ${isAnyFieldFilled ? 'w-0 overflow-hidden' : 'w-auto'}`}>
              <BaseButton variant="tablebutton" onClick={() => dispatch(toggleModal())}>
                დამატება
              </BaseButton>
            </div>
            <BaseSearch
              onChange={(value) => updateSearch({ name: value })}
              onFilterUpdate={(values) => updateSearch(values)}
            />
            <div className="flex w-full justify-end">
              <BaseCustomSelect filter />
            </div>
          </div>
          <div className="w-full">
            <div
              className={`${
                !isAnyFieldFilled ? 'h-0' : 'h-12'
              } bg-blue-600 max-h-12 overflow-hidden transition-all flex items-center justify-between px-5`}
            >
              <div className="flex items-center">
                <span className="text-white text-[12px]">რეზულტატი</span>
              </div>
              <div className="flex space-x-3 items-center">
                <ul className="flex space-x-3">
                  {Object.keys(initalSearchValues)?.map(
                    (item, key) =>
                      search?.[item] && (
                        <li key={key} className="flex px-1.5 py-[2px] space-x-1 rounded-[4px] bg-blue-500">
                          {item == 'agency' ? (
                            <span className="text-white text-[12px]">
                              {agencies?.filter((e: any) => e.id == search?.[item])?.[0]?.name}
                            </span>
                          ) : item == 'role' ? (
                            <span className="text-white text-[12px]">
                              {roles?.filter((e: any) => e.id == search?.[item])?.[0]?.name}
                            </span>
                          ) : (
                            <span className="text-white text-[12px]">{search?.[item]}</span>
                          )}
                          <img
                            className="cursor-pointer"
                            src="/assets/groupclose.svg"
                            alt="close"
                            onClick={() => updateSearch({ [item]: '' })}
                          />
                        </li>
                      ),
                  )}
                </ul>
                <BaseButton variant="groupdelete" onClick={() => updateSearch(initalSearchValues)}>
                  გაუქმება
                </BaseButton>
              </div>
            </div>
          </div>

          <div className="overflow-auto max-h-screen-table ">
            <table
              className={`w-full text-left rtl:text-right text-gray-500 divide-y divide-[#F6F4F3] dark:text-gray-400`}
            >
              <thead className="text-[14px] text-gray-400 dark:text-gray-400">
                {!loading && (
                  <tr>
                    <th scope="col" className="p-[8px] relative  pb-[12px] font-normal">
                      <span className="absolute left-[58px] bottom-[10px]">სახელი</span>
                    </th>
                    <th scope="col" className="p-[8px] relative pb-[12px] font-normal">
                      <span className="">გვარი</span>
                    </th>
                    <th scope="col" className="p-[8px] relative pb-[12px] font-normal">
                      <span className="">უწყება</span>
                    </th>
                    <th scope="col" className="p-[8px] relative pb-[12px] font-normal">
                      <span className="">თანამდებობა</span>
                    </th>
                    <th scope="col" className="p-[8px] relative pb-[12px] font-normal">
                      <span className="">ელ. ფოსტა</span>
                    </th>
                    <th scope="col" className="p-[8px] relative pb-[12px] font-normal">
                      <span className="">მობილური</span>
                    </th>
                    <th scope="col" className="p-[8px] relative pb-[12px] font-normal"></th>
                  </tr>
                )}
              </thead>

              <tbody className="divide-y divide-gray-200 relative">
                {loading ? (
                  <tr>
                    <td className="text-center">
                      <BaseLoading classes={'mt-10'} />
                    </td>
                  </tr>
                ) : (
                  <>
                    {customers?.map((item: any, index: any) => (
                      <tr key={index} className="bg-white  hover:bg-gray-50">
                        <th
                          scope="row"
                          className="py-[10px] px-6 flex items-center font-normal text-[14px] text-black max-w-[120px]"
                        >
                          <img
                            className="w-10 h-10 rounded-full"
                            src={item?.file ? `/uploads/${item?.file}` : '/assets/avatar.svg'}
                            alt="Jese image"
                          />
                          <div className="ps-3">
                            <div>
                              <span className=" whitespace-nowrap text-ellipsis overflow-hidden block max-w-[70px]">
                                {item.name}
                              </span>
                            </div>
                          </div>
                        </th>
                        <td className="p-[8px] font-normal text-[14px] text-black max-w-[70px]">
                          <span className="whitespace-nowrap text-ellipsis overflow-hidden block max-w-[100px]">
                            {item.lastName}
                          </span>
                        </td>
                        <td className="p-[8px] font-normal text-[14px] text-black max-w-[100px]">
                          <span className="whitespace-nowrap text-ellipsis overflow-hidden block max-w-[170px]">
                            {agencies?.filter((e: any) => e.id == item.agency)?.[0]?.name}
                          </span>
                        </td>
                        <td className="p-[8px] font-normal text-[14px] text-black max-w-[70px]">
                          <span className="whitespace-nowrap text-ellipsis overflow-hidden block max-w-[170px]">
                            {item.position}
                          </span>
                        </td>
                        <td className="p-[8px] font-normal text-[14px] text-black max-w-[70px]">
                          <span className="whitespace-nowrap text-ellipsis overflow-hidden block max-w-[170px]">
                            {item.email}
                          </span>
                        </td>
                        <td className="p-[8px] font-normal text-[14px] text-black max-w-[70px]">
                          <span className="whitespace-nowrap text-ellipsis overflow-hidden block max-w-[100px]">
                            {item.phone}
                          </span>
                        </td>
                        <td className="py-[8px]">
                          <span className="whitespace-nowrap text-ellipsis overflow-hidden block max-w-[100px]"></span>
                          <BaseCustomSelect
                            edit
                            onEdit={() => {
                              viewCustomerData(item?.id);
                            }}
                            onDelete={() => {
                              deleteCustomerData(item?.id);
                              setTimeout(() => {
                                getCustomerData();
                              }, 500);
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <aside
          className={`${
            isRightSideBar ? 'w-[480px]' : 'w-[0px]'
          } transition-all duration-300 overflow-hidden bg-white rounded-[10px]`}
        >
          <RightSideBarProfile data={customer} agencies={agencies} roles={roles} loading={loadingView} />
        </aside>
      </div>
    </>
  );
};

export default TableSearch;
