const BaseTabBox = ({ data, document_levels, onEdit }: any) => {
  return (
    <div className="bg-white rounded-[10px] w-full relative py-3 px-1">
      <div className="absolute right-2 top-2">
        <button onClick={() => onEdit(data?.id)}>
          <img src="/assets/pencil.svg" alt="redact" />
        </button>
      </div>
      <div className="flex flex-col justify-center items-center px-6 space-y-[10px] py-4 rounded-lg">
        {data?.is_archive === 0 ? (
          <>
            {' '}
            <img
              src={
                data?.document_level_id === '3'
                  ? '/assets/national.svg'
                  : data?.document_level_id === '2'
                  ? '/assets/sector.svg'
                  : data?.document_level_id === '1'
                  ? '/assets/institute.svg'
                  : ''
              }
              alt="icons"
            />
          </>
        ) : (
          <>
            <img src="/assets/archive.svg" alt="archive" />
          </>
        )}

        {data?.is_archive === 0 ? (
          <>
            <span className="text-[10px] text-gray-500">{`${data?.createdAt?.split('T')[0]}`}</span>{' '}
          </>
        ) : (
          <>
            <span className="text-[10px] text-gray-500">არქივი</span>
          </>
        )}
      </div>
      <div className="px-2 mb-4">
        <h1 className="text-black text-sm font-semibold text-start">{data.name}</h1>
      </div>
      <div className="px-2 flex justify-between">
        <span className="text-gray-500 text-xs">{data.name_code}</span>
        <span className="text-gray-500 text-xs">
          {document_levels?.filter((e: any) => e.id == data.document_level_id)?.[0]?.name}
        </span>
      </div>
    </div>
  );
};

export default BaseTabBox;
