import { useApi } from '@app/hooks';
import { useState } from 'react';

interface authError {
  message?: string;
  error: boolean;
}

const useAgency = () => {
  const api = useApi();

  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<any>({
    name: '',
  });
  const [data, setData] = useState<any>();
  const [error, setError] = useState<authError>({
    message: 'Something went wrong!',
    error: false,
  });

  const updateSearch = (newState: any) => {
    setSearch((prevState: any) => ({
      ...prevState,
      ...newState,
    }));
  };

  const getData = async () => {
    setLoading(true);
    api
      .fetchGet('/agency', search)
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
    search,
    data,
    getData,
    updateSearch,
  };
};

export default useAgency;
