import React from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/auth-context";

const ProtectedRoute = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const { isAuthenticated, loading } = useAuth();

    React.useEffect(() => {
      if (!isAuthenticated && !loading) {
        router.push("/login");
      }
    }, [isAuthenticated, loading, router]);

    return !loading && isAuthenticated ? (
      <WrappedComponent {...props} />
    ) : null;
  };

  return Wrapper;
};

export default ProtectedRoute;
