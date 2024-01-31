'use client';
import styles from './BasePictureUpload.module.css';
import { ChangeEvent, useState } from 'react';

interface BasePictureUploadProps {
  onChange?: (e: any) => void;
  type?: string;
  name?: string;
  value?: any;
}

const BasePictureUpload: React.FC<any> = ({ onChange, type, name, value }: BasePictureUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null);
    if (onChange) {
      onChange(e);
    }
  };
  return (
    <div>
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
            <input
              name={name}
              id="dropzone-file"
              type={type}
              value={value}
              className="hidden"
              onChange={handleFileChange}
            />
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
        </div>
      </div>
    </div>
  );
};

export default BasePictureUpload;
