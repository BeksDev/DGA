import { useApi } from '@app/hooks';
import { useState } from 'react';

interface authError {
  message?: string;
  error: boolean;
}

const useTabs = () => {
  const api = useApi();

  const initialRoleValues = {
    name: '',
    name_code: '',
    is_archive: 0,
    is_active: 1,
    document_level_id: null,
  };

  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<any>({
    name: '',
    namecode: '',
    documentlevel: '',
  });
  const [data, setData] = useState<any>();
  const [tabData, setTabData] = useState<any>(initialRoleValues);
  const [documentLevels, setDocumentLevels] = useState<any>();
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
      .fetchGet('/tabs', search)
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
      .fetchPost('/tabs/add', params)
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
      .fetchGet(`/tabs/${id}`)
      .then((res) => {
        setTabData(res.data?.[0]);
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
      .fetchPost(`/tabs/edit/${id}`, params, 'PUT')
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

  const getDocumentLevels = async () => {
    setLoading(true);
    api
      .fetchGet('/document-level')
      .then((res) => {
        setDocumentLevels(res.data);
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
    tabData,
    setTabData,
    documentLevels,
    getDocumentLevels,
    getData,
    viewData,
    saveData,
    createData,
    updateSearch,
  };
};

export default useTabs;
