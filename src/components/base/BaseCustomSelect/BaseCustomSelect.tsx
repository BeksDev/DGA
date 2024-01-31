'use client';
import { Fragment, useState, FC, HTMLProps } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useDispatch } from 'react-redux';
import { rightSideBarOpenModal } from '@app/redux';
import styles from './BaseCustomSelect.module.css';
import { useAuth } from '@/hooks';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
interface BaseCustomSelect extends HTMLProps<HTMLButtonElement> {
  edit?: boolean;
  logout?: boolean;
  filter?: boolean;
  imgPath?: any;
  onEdit?: () => void;
  onDelete?: () => void;
}

const BaseCustomSelect: FC<BaseCustomSelect> = ({ edit, logout, filter, onEdit, onDelete, imgPath }) => {
  const dispatch = useDispatch();

  const { logout: userLogout, getAuthUser } = useAuth();

  const [selected, setSelected] = useState<number>(0);
  const statuses = ['ყველა', 'აქტიურია', 'მომლოდინე', 'გაუქმებულია'];
  const title = statuses[selected] || '';

  return (
    <Menu as="div" className={styles.menuWrapper}>
      <div>
        {filter && (
          <Menu.Button className={styles.menuButton}>
            {title}
            <img src="/assets/arrowdown.svg" alt="arrowdown" className={styles.arrowStyles} />
          </Menu.Button>
        )}
        {logout && (
          <Menu.Button className={styles.secondMenuButton}>
            <img
              className={styles.imgStyles}
              src={JSON.parse(getAuthUser())?.file ? `/uploads/${JSON.parse(getAuthUser())?.file}` : "/assets/avatar.svg"}
              alt="img"
            />
            <img src="/assets/arrowdownn.svg" alt="arrowdown" className={styles.arrowStyles} />
          </Menu.Button>
        )}
        {edit && (
          <Menu.Button className={styles.editButton}>
            <img className={styles.dotsIcon} src="/assets/dots.svg" alt="" />
          </Menu.Button>
        )}
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className={`${styles.menuItemsStyles} ${edit ? 'w-[248px]' : 'w-[170px]'}`}>
          {filter && (
            <div className={styles.filterWrapper}>
              {['ყველა', 'აქტიური', 'მომლოდინე', 'გაუქმებულია'].map((item, key) => (
                <Menu.Item key={key}>
                  {({ active }) => (
                    <span
                      onClick={() => setSelected(key)}
                      className={classNames(active ? 'bg-gray-100' : '', `${styles.filterSpan}`)}
                    >
                      <img
                        className={`mt-1.5 ${selected === key ? 'visible' : 'invisible'}`}
                        src="/assets/okay.svg"
                        alt="okay"
                      />
                      {item}
                    </span>
                  )}
                </Menu.Item>
              ))}
            </div>
          )}
          {logout && (
            <div className="overflow-hidden">
              {['გამოსვლა'].map((item, key) => (
                <Menu.Item key={key}>
                  {({ active }) => (
                    <span
                      onClick={() => userLogout()}
                      className={classNames(active ? 'bg-gray-100' : '', `${styles.logoutStyles} caseon`)}
                    >
                      <img
                        src={getAuthUser()?.file ? `/uploads/${getAuthUser()?.file}` : '/assets/remo.svg'}
                        alt="remo"
                      />
                      {item}
                    </span>
                  )}
                </Menu.Item>
              ))}
            </div>
          )}
          {edit && (
            <div className="overflow-hidden">
              {[
                { name: 'პროფილის ნახვა', img: '/assets/user.svg' },
                { name: 'მომხმარებლის გაუქმება', img: '/assets/profileremove.svg' },
              ].map((item, key) => (
                <Menu.Item key={key}>
                  {({ active }) => (
                    <span
                      onClick={() => {
                        if (key === 0) {
                          dispatch(rightSideBarOpenModal());
                          setTimeout(() => {
                            if (onEdit) {
                              onEdit();
                            }
                          }, 500);
                        } else {
                          if (onDelete) {
                            onDelete();
                          }
                        }
                      }}
                      className={classNames(
                        active ? 'bg-gray-100' : '',
                        `${styles.editStyles} ${key ? 'text-red-700' : 'text-black-700'} caseon`,
                      )}
                    >
                      <img src={item.img} alt="remo" />
                      {item.name}
                    </span>
                  )}
                </Menu.Item>
              ))}
            </div>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default BaseCustomSelect;
