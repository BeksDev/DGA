'use client';
import { BaseButton, BaseInput, BaseSelect } from '@/components';
import { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, tabAddOpenToggleModal } from '@app/redux';
import { useTabs } from '@/hooks';

interface TabAddProps {
  id?: number;
  edit?: boolean;
  titleName?: string;
  documentLevels?: [];
  isArchive?: boolean;
  isModalOpen?: boolean;
  onTabModalClose: () => void;
  reloadTabData: () => any;
}

const TabAdd: React.FC<TabAddProps> = ({
  id,
  edit,
  titleName,
  documentLevels,
  isArchive,
  isModalOpen,
  onTabModalClose,
  reloadTabData,
}) => {
  const { loading, tabData, setTabData, createData, viewData, saveData } = useTabs();

  const updateTab = (newState: any) => {
    setTabData((prevState: any) => ({
      ...prevState,
      ...newState,
    }));
  };

  const onTabCreate = () => {
    if (id) {
      saveData(id, tabData);
    } else {
      createData(tabData);
    }
    setTimeout(() => {
      reloadTabData();
    }, 500);
    onTabModalClose();
  };

  useEffect(() => {
    if (isArchive) {
      updateTab({ is_archive: 1 });
    }
  }, [isArchive]);

  useEffect(() => {
    if (id) {
      viewData(id);
    }
  }, [id]);

  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => onTabModalClose()}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative  transform overflow-hidden rounded-[10px] bg-white text-left shadow-xl transition-all sm:my-8 sm:max-w-[799px]">
                <div className="w-[500px] max-w-[500px] rounded-[10px] bg-white">
                  <div className="p-4 border-b border-gray-300">
                    <h1 className="text-center caseon text-sm text-blue-800 font-bold">{titleName}</h1>
                  </div>
                  <div className="p-6 flex flex-col space-y-4">
                    {!!id && (
                      <BaseInput
                        disabled
                        showLabel
                        labelText="NAMECODE"
                        placeholder="NAM004151"
                        value={tabData?.name_code}
                      />
                    )}
                    <BaseInput
                      placeholder="ჩაწერე სახელი"
                      showLabel
                      labelText="დასახელება(ქარ)"
                      mustFilled
                      value={tabData?.name}
                      onChange={(e: any) => updateTab({ name: e?.target?.value })}
                    />
                    <BaseInput placeholder="ჩაწერე სახელი" showLabel labelText="დასახელება(ENG)" />
                    <BaseSelect
                      options={documentLevels}
                      mustFilled
                      showLabel
                      labelText="დოკუმენტის დონე"
                      value={tabData?.document_level_id}
                      onChange={(e: any) => updateTab({ document_level_id: e?.target?.value })}
                    />
                  </div>
                  <div className="flex justify-end items-center p-4 border-t space-x-3 border-gray-300">
                    <BaseButton variant="clear" onClick={() => onTabModalClose()}>
                      გაუქმება
                    </BaseButton>
                    <BaseButton onClick={() => onTabCreate()}>დამატება</BaseButton>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default TabAdd;
