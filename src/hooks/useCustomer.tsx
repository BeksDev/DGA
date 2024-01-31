'use client';

import { useApi } from '@app/hooks';
import { useState } from 'react';

interface authError {
  message?: string;
  error: boolean;
}

const useCustomer = () => {
  const api = useApi();

  const initalSearchValues = {
    name: '',
    lastName: '',
    agency: '',
    position: '',
    email: '',
    phone: '',
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [loadingView, setLoadingView] = useState<boolean>(true);
  const [search, setSearch] = useState<any>(initalSearchValues);
  const [avatar, setAvatar] = useState<any>('');
  const [data, setData] = useState<any>();
  const [customer, setCustomer] = useState<any>({});
  const [customers, setCustomers] = useState<any>([]);
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
      .fetchGet('/users', search)
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

  const viewData = async (id: any) => {
    setLoadingView(true);
    api
      .fetchGet(`/users/${id}`)
      .then((res) => {
        setCustomer(res.data?.[0]);
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
          setLoadingView(false);
        }, 500);
      });
  };

  const createData = async (params: any) => {
    setLoading(true);
    api
      .fetchPostForm('/users/add', params, { file: avatar })
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

  const deleteData = async (id: any) => {
    setLoading(true);
    api
      .fetchPost(`/users/delete/${id}`, {}, 'DELETE')
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

  return {
    error,
    loading,
    loadingView,
    setLoadingView,
    avatar,
    setAvatar,
    search,
    initalSearchValues,
    data,
    customer,
    customers,
    getData,
    createData,
    viewData,
    deleteData,
    updateSearch,
  };
};

export default useCustomer;
