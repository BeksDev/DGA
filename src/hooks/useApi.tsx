'use client';

import { deleteCookie, getCookie } from 'cookies-next';
import { BASE_URL } from '@app/config';
import { useRouter } from 'next/navigation';

const useApi = () => {
  const router = useRouter();

  const validateAuthSessionToken = (status: any) => {
    if (status == 401) {
      deleteCookie('token', { path: '/' });
      router.push('/auth');
    }
  };

  const getAuthToken = () => {
    const token = getCookie('token');
    return token;
  };

  const fetchGet = async (url: string, params?: any) => {
    const authToken = getAuthToken();
    const searchParams = new URLSearchParams(params).toString();

    const response = await fetch(`${BASE_URL}/${url}/?${searchParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      validateAuthSessionToken(response.status);
      throw data;
    }

    return data;
  };

  const fetchPost = async (url: string, body?: any, method = 'POST') => {
    const authToken = getAuthToken();
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      validateAuthSessionToken(response.status);
      throw data;
    }

    return data;
  };

  const fetchPostForm = async (url: string, body?: any, file?: any) => {
    const authToken = getAuthToken();

    var formdata = new FormData();

    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        formdata.append(key, body[key]);
      }
    }

    console.log(file?.file);

    if (file) {
      formdata.append('file', file?.file);
    }

    const response = await fetch(`${BASE_URL}/${url}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: formdata,
    });

    const data = await response.json();

    if (!response.ok) {
      validateAuthSessionToken(response.status);
      throw data;
    }

    return data;
  };

  return {
    fetchGet,
    fetchPost,
    fetchPostForm,
  };
};

export default useApi;
