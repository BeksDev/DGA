'use client';
import { BaseButton } from '../../base';
import styles from './BaseUpload.module.css';
import { ChangeEvent, Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@app/redux';
import { uploadOpenToggleModal } from '@app/redux';

const CustomerAdd: React.FC = () => {
  const { isUploadOpen } = useSelector((state: RootState) => state.modal);
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null);
  };
  return (
    <Transition.Root show={isUploadOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => dispatch(uploadOpenToggleModal())}>
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
              <Dialog.Panel className="relative  transform overflow-hidden rounded-[10px] bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[451px]">
                <div className={styles.wrapper}>
                  <div className={styles['uppload-wrapper']}>
                    <img className="mb-6" src="/assets/upload.svg" alt="upload" />
                    <h1 className={styles['upload-title']}>ატვირთვა</h1>
                    <label className={styles['upload-label']}>
                      <div className={styles['upload-wrapper-inlabel']}>
                        <p className={styles['upload-paragraph']}>
                          <span className={styles['upload-paragraph-span']}>დააჭირეთ ატვირთვას</span> ან ჩააგდეთ
                        </p>
                        <p className={styles['upload-allowed']}>
                          {selectedFile
                            ? `ფაილის დასაშვები ფორმატი: JPEG, JPG, PNG`
                            : 'ფორმატი: JPEG, JPG, PNG. მაქსიმალური ზომა: 20MB'}
                        </p>
                      </div>
                      <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                    {selectedFile && (
                      <div className={styles['uploaded-wrapper']}>
                        <button disabled className="p-[10px] border border-blue-200 rounded-lg">
                          {selectedFile?.name?.split('.')?.pop()?.toUpperCase()}
                        </button>
                        <p className="truncate w-full">{selectedFile.name}</p>
                        <img
                          onClick={() => setSelectedFile(null)}
                          className="cursor-pointer"
                          src="/assets/closeupload.svg"
                          alt="close"
                        />
                      </div>
                    )}
                    <div className={styles['upload-btn-wrapper']}>
                      <BaseButton variant="clear" onClick={() => dispatch(uploadOpenToggleModal())}>
                        გაუქმება
                      </BaseButton>
                      <BaseButton variant={selectedFile ? 'primary' : 'disabled'}>შენახვა</BaseButton>
                    </div>
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

export default CustomerAdd;
