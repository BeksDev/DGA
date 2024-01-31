// utils/api.ts
import { GetServerSidePropsContext } from 'next';
import { cookies } from 'next/headers';

const base_url = 'http://localhost:3000/api/v1';

const getAuthToken = (context?: any) => {
  const token = cookies().get('token');
  return token?.value as string;
};

const fetchGet = async (url: string, params: Record<string, any> = {}, context?: any) => {
  const authToken = getAuthToken(context);
  const searchParams = new URLSearchParams(params).toString();

  const response = await fetch(`${base_url}/${url}/?${searchParams}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message);
  }

  return data;
};

const fetchPost = async (
  url: string,
  body: Record<string, any> = {},
  method: 'POST' | 'PUT' = 'POST',
  context?: GetServerSidePropsContext,
) => {
  const authToken = getAuthToken(context);
  const response = await fetch(`${base_url}/${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message);
  }

  return data;
};

const fetchPostForm = async (
  url: string,
  body: Record<string, FormDataEntryValue>,
  context?: GetServerSidePropsContext,
) => {
  const authToken = getAuthToken(context);

  var formData = new FormData();
  for (const key in body) {
    if (Object.prototype.hasOwnProperty.call(body, key)) {
      formData.append(key, body[key]);
    }
  }

  const response = await fetch(`${base_url}/${url}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message);
  }

  return data;
};

export { fetchGet, fetchPost, fetchPostForm };
