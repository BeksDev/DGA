import React from 'react';
import { cookies } from 'next/headers';
import { apiSSR } from '@app/util';

export default async function ServerPage({ req, res }: any) {
  const data = await apiSSR.fetchGet('/users', {}, { req, res });

  return <div>{}</div>;
}
