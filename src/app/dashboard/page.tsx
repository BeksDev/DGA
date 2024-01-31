'use client';
import {
  DashboardSearch,
  TabAdd,
  BaseTabBox,
  BaseButton,
  BaseCustomSelect,
  BaseLoading,
} from '@/components';
import { useTabs } from '@/hooks';
import { useEffect, useState } from 'react';

export default function Page() {
  const [isTabModalOpen, setTabModal] = useState<boolean>(false);
  const [isTabArchiveModalOpen, setTabArchiveModal] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<number>(0);

  const { search, updateSearch, loading, data, getData, getDocumentLevels, documentLevels } = useTabs();

  useEffect(() => {
    getData();
  }, [search]);

  useEffect(() => {
    getDocumentLevels();
  }, []);

  return (
    <div>
      <TabAdd
        id={currentId}
        titleName="ჩანართის შექმნა"
        documentLevels={documentLevels}
        isModalOpen={isTabModalOpen}
        onTabModalClose={() => setTabModal(false)}
        reloadTabData={() => getData()}
      />
      <TabAdd
        titleName="არქივში დამატება"
        documentLevels={documentLevels}
        isModalOpen={isTabArchiveModalOpen}
        onTabModalClose={() => setTabArchiveModal(false)}
        isArchive={true}
        reloadTabData={() => getData()}
      />
      <div className="grid grid-cols-[312px_auto_auto_auto] grid-rows-[66px_auto_auto_auto] gap-3 ">
        <nav className="col-span-4 row-span-1 flex justify-between items-center p-[10px] bg-white rounded-[10px]">
          <div className="flex space-x-3">
            <BaseButton variant="tablebutton" onClick={() => setTabModal(true)}>
              ახალი ჩანართი
            </BaseButton>
            <BaseButton variant="archive" onClick={() => setTabArchiveModal(true)}>
              არქივში დამატება
            </BaseButton>
          </div>
          <div>
            <BaseCustomSelect filter />
          </div>
        </nav>

        <aside className="row-span-2 col-span-1 bg-white rounded-[10px]">
          <DashboardSearch
            documentLevels={documentLevels}
            onChange={(value) => updateSearch({ name: value })}
            onFilterUpdate={(values) => updateSearch(values)}
          />
        </aside>

        <main className="col-start-2 col-span-3 row-start-2 row-span-4 h-full w-full rounded-[10px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
            {loading ? (
              <tr>
                <td className="text-center">
                  <BaseLoading classes={'mt-10 ml-[388px]'} />
                </td>
              </tr>
            ) : (
              <>
                {data?.map((item: any, key: any) => (
                  <BaseTabBox
                    key={key}
                    data={item}
                    document_levels={documentLevels}
                    onEdit={(id: number) => {
                      setCurrentId(id);
                      setTabModal(true);
                    }}
                  />
                ))}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
