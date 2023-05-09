import React, { createContext, useState, useEffect, useContext } from "react";
import {
  saveAuthToLocalStorage,
  removeAuthFromLocalStorage,
  getAuthFromLocalStorage,
} from "../utils/auth";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const [authState, setAuthState] = useState(() => {
    return {
      isAuthenticated: false,
      user: null,
      jwt: null,
    };
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authFromLocal = getAuthFromLocalStorage();
    if (authFromLocal) {
      loginUser(authFromLocal.user, authFromLocal.jwt);
    }
    setLoading(false);
  }, []);

  const loginUser = (user, jwt) => {
    saveAuthToLocalStorage(user, jwt);
    setAuthState({ isAuthenticated: true, user, jwt });
  };

  const logoutUser = () => {
    removeAuthFromLocalStorage();
    setAuthState({ isAuthenticated: false, user: null, jwt: null });
  };

  return (
    <AuthContext.Provider
      value={{ ...authState, loginUser, logoutUser, loading }}
      {...props}
    />
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
