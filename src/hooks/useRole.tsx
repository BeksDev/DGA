import { useApi } from '@app/hooks';
import { useState } from 'react';

interface authError {
  message?: string;
  error: boolean;
}

const useRole = () => {
  const api = useApi();

  const initialRoleValues = {
    name: '',
    description: '',
    permissions: {
      users: [],
      tabs: [],
      roles: [],
    },
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<any>({
    role: '',
  });
  const [data, setData] = useState<any>();
  const [roleData, setRoleData] = useState<any>(initialRoleValues);
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

  const updateRole = (newState: any) => {
    setSearch((prevState: any) => ({
      ...prevState,
      ...newState,
    }));
  };

  const getData = async () => {
    setLoading(true);
    api
      .fetchGet('/role', search)
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

  const createData = async (params: any) => {
    setLoading(true);
    api
      .fetchPost('/role/add', params)
      .then((res) => {
        console.log(res);
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

  const viewData = async (id: any) => {
    setLoading(true);
    api
      .fetchGet(`/role/${id}`)
      .then((res) => {
        setRoleData(res.data?.[0]);
      })
      .catch((e) => {
        setError({
          error: e?.success == 'false' ? false : true,
          message: e?.error || 'Something went wrong!',
        });
        console.log(e);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };

  const saveData = async (id: any, params: any) => {
    setLoading(true);
    api
      .fetchPost(`/role/edit/${id}`, params, 'PUT')
      .then((res) => {
        // setRoleData(res.data?.[0]);
      })
      .catch((e) => {
        setError({
          error: e?.success == 'false' ? false : true,
          message: e?.error || 'Something went wrong!',
        });
        console.log(e);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };

  return {
    initialRoleValues,
    error,
    loading,
    search,
    data,
    roleData,
    setRoleData,
    getData,
    viewData,
    saveData,
    createData,
    updateSearch,
  };
};

export default useRole;
