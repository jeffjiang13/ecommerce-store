import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getAuthFromLocalStorage } from './auth';

const withAuth = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();

    useEffect(() => {
      const auth = getAuthFromLocalStorage();
      if (!auth) {
        router.replace('/login');
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
