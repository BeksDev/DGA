'use client';

import { useCallback, useEffect, useState } from 'react';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { usePermision, useRole } from '@app/hooks';
import { BaseButton, BaseInput, BaseLoading } from '@components/base';

export default function Page() {
  const {
    initialRoleValues,
    roleData,
    setRoleData,
    data: roles,
    getData: getRoleData,
    viewData: viewRoleData,
    saveData: saveRoleData,
    createData: createRoleData,
  } = useRole();
  const {
    permisionCategories,
    loading: permisionLoading,
    data: permisions,
    getData: getPermisionData,
  } = usePermision();

  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    getPermisionData();
    getRoleData();
  }, []);

  const updateRoleState = (e: any) => {
    const { name } = e?.target || {};

    setRoleData((prevState: any) => ({
      ...prevState,
      [name]: e?.target?.value,
    }));
  };

  const updateRolePermissionState = useCallback(
    (category: any, itemId: any) => {
      setRoleData((prevState: any) => {
        const permissions = prevState.permissions || {};
        const updatedPermissions = { ...permissions };

        updatedPermissions[category] = Array.isArray(updatedPermissions[category]) ? updatedPermissions[category] : [];

        const index = updatedPermissions[category].indexOf(itemId);
        if (index !== -1) {
          updatedPermissions[category] = updatedPermissions[category].filter((i: any) => i !== itemId);
        } else {
          updatedPermissions[category] = [...updatedPermissions[category], itemId];
        }

        return {
          ...prevState,
          permissions: updatedPermissions,
        };
      });
    },
    [roleData],
  );

  const onRoleUpdate = () => {
    createRoleData(roleData);
  };

  const onRoleSave = (id: number) => {
    saveRoleData(id, roleData);
  };

  return (
    <>
      <div className="h-full flex space-x-2">
        <main className="bg-white h-full w-full rounded-[10px]">
          <div className="px-4 py-2.5 space-x-4 flex justify-between items-center">
            <BaseButton
              variant="tablebutton"
              onClick={() => {
                setRoleData(initialRoleValues);
                setOpen((open) => !open);
              }}
            >
              დამატება
            </BaseButton>
            <span className="text-sm font-normal text-gray-500">სულ {roles?.length}</span>
          </div>
          <div className="mt-2 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-[#F6F4F3]">
                  {!permisionLoading && (
                    <thead>
                      <tr>
                        <th scope="col" className="py-2 pr-2 pl-4 text-left text-sm font-normal text-gray-500">
                          სახელი
                        </th>
                        <th scope="col" className="p-2 text-left text-sm font-normal text-gray-500">
                          აღწერა
                        </th>
                        <th scope="col" className="relative p-2">
                          <span className="sr-only">შესწორე</span>
                        </th>
                      </tr>
                    </thead>
                  )}
                  <tbody className="divide-y divide-gray-200">
                    {permisionLoading ? (
                      <tr>
                        <td className="text-center">
                          <BaseLoading classes={'mt-10'} />
                        </td>
                      </tr>
                    ) : (
                      <>
                        {roles?.map((item: any, index: any) => (
                          <tr key={index}>
                            <td className="whitespace-nowrap py-2 pr-2 pl-4 text-sm text-black font-normal">
                              {item.name}
                            </td>
                            <td className="whitespace-nowrap p-2 text-sm text-black font-normal">{item.description}</td>
                            <td className="whitespace-nowrap p-2 text-sm text-black font-normal">{item.people}</td>
                            <td className="relative whitespace-nowrap py-2 pr-4 pl-2 text-right text-sm w-[168px]">
                              <div className="inline-flex gap-x-6 shadow-sm shadow-black/10 px-3 py-1 rounded-[4px] overflow-hidden">
                                <button
                                  onClick={() => {
                                    viewRoleData(item?.id);
                                    setOpen((open) => !open);
                                  }}
                                >
                                  <img className="w-[32px] h-[32px]" src="/assets/inf.svg" alt="inf" />
                                </button>
                                <button
                                  onClick={() => {
                                    viewRoleData(item?.id);
                                    setOpen((open) => !open);
                                  }}
                                >
                                  <img src="/assets/pencil.svg" alt="pencil" />
                                </button>
                                <button onClick={() => setOpenDeleteModal((openDeleteModal) => !openDeleteModal)}>
                                  <img src="/assets/garbage.svg" alt="garbage" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal */}
      <Transition.Root show={open}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full w-[60%] pl-10">
                <Transition.Child
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                  className="w-[100%]"
                >
                  <Dialog.Panel className="pointer-events-auto h-full bg-gray-100">
                    <div className="relative flex h-full flex-col shadow-xl overflow-auto">
                      <div className="flex items-center justify-between p-4 bg-white">
                        <div className="flex items-center">
                          <div className="flex h-7 items-center mr-2">
                            <button
                              type="button"
                              className="relative rounded-md bg-transparent focus:outline-none p-2"
                              onClick={() => setOpen(false)}
                            >
                              <svg
                                width="12"
                                height="13"
                                viewBox="0 0 12 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M11.7338 0.775313C11.3788 0.420364 10.8055 0.420364 10.4505 0.775313L6 5.21672L1.54949 0.766212C1.19454 0.411263 0.62116 0.411263 0.266212 0.766212C-0.0887372 1.12116 -0.0887372 1.69454 0.266212 2.04949L4.71672 6.5L0.266212 10.9505C-0.0887372 11.3055 -0.0887372 11.8788 0.266212 12.2338C0.62116 12.5887 1.19454 12.5887 1.54949 12.2338L6 7.78328L10.4505 12.2338C10.8055 12.5887 11.3788 12.5887 11.7338 12.2338C12.0887 11.8788 12.0887 11.3055 11.7338 10.9505L7.28328 6.5L11.7338 2.04949C12.0796 1.70364 12.0796 1.12116 11.7338 0.775313Z"
                                  fill="#323232"
                                />
                              </svg>
                            </button>
                          </div>
                          <Dialog.Title className="text-base font-bold leading-6 text-gray-900 caseon">
                            როლის დამატება
                          </Dialog.Title>
                        </div>
                        <BaseButton
                          variant="primary"
                          onClick={() => {
                            if (roleData?.id) {
                              onRoleSave(roleData?.id);
                            } else {
                              onRoleUpdate();
                            }
                            setOpen(false);
                            setTimeout(() => {
                              getRoleData();
                            }, 500);
                          }}
                        >
                          შენახვა
                        </BaseButton>
                      </div>
                      <div className="relative mt-6 flex-1 px-10">
                        <div className="flex flex-col gap-2">
                          <BaseInput
                            placeholder="ჩაწერეთ როლის სახელწოდება *"
                            labelText="როლის სახელწოდება *"
                            showLabel
                            name="name"
                            value={roleData?.name}
                            onChange={updateRoleState}
                          />
                          <BaseInput
                            placeholder="ჩაწერეთ როლის აღწერა"
                            showLabel
                            labelText="როლის აღწერა"
                            name="description"
                            value={roleData?.description}
                            onChange={updateRoleState}
                          />
                          <h5 className="BaseInput_input-title__cNlXL caseon mt-2">როლის უფლებები</h5>
                          <div className="border border-gray-200 rounded-lg pt-5 pb-4 px-5">
                            {Object.keys(permisions)?.map((permision_category: any, permision_category_key: any) => (
                              <div className="mb-4" key={permision_category_key}>
                                <Disclosure>
                                  {({ open }) => (
                                    <>
                                      <Disclosure.Button className="flex items-center justify-between w-full">
                                        <div className="BaseInput_input-title__cNlXL caseo">
                                          <div className="flex items-center">
                                            <h5 className="mr-2">{permisionCategories?.[permision_category]}</h5>
                                            <svg
                                              width="14"
                                              height="15"
                                              viewBox="0 0 14 15"
                                              fill="none"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                d="M7 0.5C3.136 0.5 0 3.636 0 7.5C0 11.364 3.136 14.5 7 14.5C10.864 14.5 14 11.364 14 7.5C14 3.636 10.864 0.5 7 0.5ZM7 13.1C3.913 13.1 1.4 10.587 1.4 7.5C1.4 4.413 3.913 1.9 7 1.9C10.087 1.9 12.6 4.413 12.6 7.5C12.6 10.587 10.087 13.1 7 13.1ZM9.716 4.903L5.6 9.019L4.284 7.703C4.011 7.43 3.57 7.43 3.297 7.703C3.024 7.976 3.024 8.417 3.297 8.69L5.11 10.503C5.383 10.776 5.824 10.776 6.097 10.503L10.71 5.89C10.983 5.617 10.983 5.176 10.71 4.903C10.437 4.63 9.989 4.63 9.716 4.903Z"
                                                fill="#2970FF"
                                              />
                                            </svg>
                                            <span className="text-[#2970FF] inline-block ml-1">2</span>
                                          </div>
                                        </div>
                                        <div className={`${open ? 'rotate-180 transform' : ''} `}>
                                          <svg
                                            width="14"
                                            height="8"
                                            viewBox="0 0 14 8"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path
                                              d="M1 1L7 7L13 1"
                                              stroke="#261C15"
                                              stroke-width="2"
                                              stroke-linecap="round"
                                              stroke-linejoin="round"
                                            />
                                          </svg>
                                        </div>
                                      </Disclosure.Button>

                                      <Disclosure.Panel>
                                        <fieldset className="mt-4">
                                          {/* <legend className="sr-only">ჩანართები</legend> */}
                                          {permisions?.[permision_category]?.map(
                                            (permission_item: any, permission_item_key: any) => (
                                              <div
                                                key={permission_item_key}
                                                onClick={() => {
                                                  updateRolePermissionState(permision_category, permission_item.id);
                                                }}
                                              >
                                                <div className="flex flex-col gap-3 cursor-pointer mb-3">
                                                  <div className="relative flex items-start border border-gray-200 rounded-lg p-5 bg-white">
                                                    <div className="min-w-0 flex-1 text-sm leading-6">
                                                      <p className="font-medium text-gray-900">
                                                        {permission_item?.name}
                                                      </p>
                                                      <p id="role-description" className="text-gray-500">
                                                        მომხმარებელს შეუძლია {permission_item?.name}
                                                      </p>
                                                    </div>
                                                    <div className="ml-3 flex items-center h-5 w-5 rounded-full overflow-hidden relative text-indigo-600">
                                                      {roleData?.permissions?.[permision_category]?.includes(
                                                        permission_item.id,
                                                      ) && (
                                                        <svg
                                                          xmlns="http://www.w3.org/2000/svg"
                                                          className="text-indigo-600"
                                                          width="38"
                                                          height="38"
                                                          viewBox="0 0 24 24"
                                                          stroke-width="2"
                                                          stroke="currentColor"
                                                          fill="none"
                                                          stroke-linecap="round"
                                                          stroke-linejoin="round"
                                                        >
                                                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                          <path
                                                            d="M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z"
                                                            fill="currentColor"
                                                            stroke-width="0"
                                                          />
                                                        </svg>
                                                      )}
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>
                                            ),
                                          )}
                                        </fieldset>
                                      </Disclosure.Panel>
                                    </>
                                  )}
                                </Disclosure>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>

      {/* START Modal */}
      <Transition.Root show={openDeleteModal}>
        <Dialog as="div" className="relative z-10" onClose={setOpenDeleteModal}>
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                className="w-[60%]"
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full max-w-full sm:p-6">
                  <h5 className="text-base font-bold leading-6 text-gray-900 caseon pb-6 text-center border-b border-gray-200 mb-4">
                    როლის დამატება
                  </h5>
                  <p className="flex items-center gap-2 text-red-700 p-2 bg-red-50 rounded-xl mb-5">
                    <svg
                      className="flex-none"
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 4.5C8.44 4.5 8.8 4.86 8.8 5.3V8.5C8.8 8.94 8.44 9.3 8 9.3C7.56 9.3 7.2 8.94 7.2 8.5V5.3C7.2 4.86 7.56 4.5 8 4.5ZM7.992 0.5C3.576 0.5 0 4.084 0 8.5C0 12.916 3.576 16.5 7.992 16.5C12.416 16.5 16 12.916 16 8.5C16 4.084 12.416 0.5 7.992 0.5ZM8 14.9C4.464 14.9 1.6 12.036 1.6 8.5C1.6 4.964 4.464 2.1 8 2.1C11.536 2.1 14.4 4.964 14.4 8.5C14.4 12.036 11.536 14.9 8 14.9ZM8.8 12.5H7.2V10.9H8.8V12.5Z"
                        fill="#7A0000"
                      />
                    </svg>
                    <span>სისტემის მომხმარებლებს აქვთ მინიჭებული აღნიშნული როლი, როლის წაშლა შეუძლებელია</span>
                  </p>
                  <div className="relative flex items-start border border-gray-200 rounded-lg p-5 bg-white">
                    <div className="min-w-0 flex-1 text-sm leading-6">
                      <p className="font-bold text-gray-900 mb-2">ადმინისტრატორი</p>
                      <p id="role-description" className="text-gray-500">
                        მართვის სრული უფლება, მართვის სრული უფლება
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M5.6 6.4999C7.144 6.4999 8.4 5.2439 8.4 3.6999C8.4 2.1559 7.144 0.899902 5.6 0.899902C4.056 0.899902 2.8 2.1559 2.8 3.6999C2.8 5.2439 4.056 6.4999 5.6 6.4999ZM5.6 2.4999C6.264 2.4999 6.8 3.0359 6.8 3.6999C6.8 4.3639 6.264 4.8999 5.6 4.8999C4.936 4.8999 4.4 4.3639 4.4 3.6999C4.4 3.0359 4.936 2.4999 5.6 2.4999ZM5.6 7.8999C3.728 7.8999 0 8.8359 0 10.6999V11.2999C0 11.7399 0.36 12.0999 0.8 12.0999H10.4C10.84 12.0999 11.2 11.7399 11.2 11.2999V10.6999C11.2 8.8359 7.472 7.8999 5.6 7.8999ZM1.872 10.4999C2.544 10.0359 4.168 9.4999 5.6 9.4999C7.032 9.4999 8.656 10.0359 9.328 10.4999H1.872ZM11.232 7.9479C12.16 8.6199 12.8 9.5159 12.8 10.6999V12.0999H15.2C15.64 12.0999 16 11.7399 16 11.2999V10.6999C16 9.0839 13.2 8.1639 11.232 7.9479ZM10.4 6.4999C11.944 6.4999 13.2 5.2439 13.2 3.6999C13.2 2.1559 11.944 0.899902 10.4 0.899902C9.968 0.899902 9.568 1.0039 9.2 1.1799C9.704 1.8919 10 2.7639 10 3.6999C10 4.6359 9.704 5.5079 9.2 6.2199C9.568 6.3959 9.968 6.4999 10.4 6.4999Z"
                          fill="#636971"
                        />
                      </svg>
                      <span className="text-sm text-gray-500">12</span>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6 flex items-center justify-end">
                    <BaseButton variant="warning" onClick={() => setOpenDeleteModal(false)}>
                      წაშლა
                    </BaseButton>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/* End Modal */}
    </>
  );
}
