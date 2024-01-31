import { useApi } from '@app/hooks';
import { useState } from 'react';

interface authError {
  message?: string;
  error: boolean;
}

const usePermision = () => {
  const api = useApi();

  const permisionCategories: any = {
    users: 'მომხმარებლები',
    tabs: 'ჩანართები',
    roles: 'როლები',
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<authError>({
    message: 'Something went wrong!',
    error: false,
  });

  const getData = async () => {
    setLoading(true);
    api
      .fetchGet('/permissions')
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        setError({
          error: e?.success == 'false' ? false : true,
          message: e?.error || 'Something went wrong!',
        });
        console.log(e);
      })
      .finally(() => setLoading(false));
  };

  return {
    error,
    loading,
    data,
    getData,
    permisionCategories,
  };
};

export default usePermision;
