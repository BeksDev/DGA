import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { useApi } from '@app/hooks';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface authProps {
  username: string;
  password: string;
}

interface authErroProps {
  message?: string;
  error: boolean;
}

const useAuth = () => {
  const router = useRouter();
  const { fetchPost } = useApi();

  const [loadingAuthSession, setLoadingAuthSession] = useState<boolean>(false);
  const [authState, setAuthState] = useState<authProps>();
  const [authError, setAuthError] = useState<authErroProps>({
    message: 'Something went wrong!',
    error: false,
  });

  const updateAuthState = (newAuthData: Partial<authProps>) => {
    setAuthState((prevState: any) => ({
      ...prevState,
      ...newAuthData,
    }));
  };

  const getAuthToken = () => {
    return getCookie('token');
  };

  const setAuthToken = (token: string) => {
    setCookie('token', token, { path: '/' });
  };

  const setAuthUser = (user: any) => {
    setCookie('user', JSON.stringify(user), { path: '/' });
  };

  const getAuthUser: any = () => {
    const user = getCookie('user');
    return user;
  };

  const delAuthToken = () => {
    deleteCookie('token', { path: '/' });
  };

  const delAuthUser = () => {
    deleteCookie('user', { path: '/' });
  };

  const logout = () => {
    delAuthUser();
    delAuthToken();
    router.push('/auth');
  };

  const validateAuthToken = () => {
    let status = false;

    if (getAuthToken()) {
      status = true;
    } else {
      logout();
      status = false;
    }
    setLoadingAuthSession(true);

    return status;
  };

  const signIn = async () => {
    fetchPost('/sign-in', authState)
      .then((res) => {
        setAuthToken(res?.data.token);
        setAuthUser(res?.data.user);

        router.push('/dashboard/customers?title=მომხმარებლები');
      })
      .catch((e) => {
        setAuthError({
          error: e?.success == 'false' ? false : true,
          message: e?.error || 'Something went wrong!',
        });
        console.log(e);
      });
  };

  return {
    logout,
    validateAuthToken,
    signIn,
    loadingAuthSession,
    authError,
    authState,
    updateAuthState,
    getAuthUser,
  };
};

export default useAuth;
