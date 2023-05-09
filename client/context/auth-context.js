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
      isLoading: true,
      isAuthenticated: false,
      user: null,
      jwt: null,
    };
  });

  useEffect(() => {
    const authFromLocal = getAuthFromLocalStorage();
    if (authFromLocal) {
      loginUser(authFromLocal.user, authFromLocal.jwt);
    } else {
      setAuthState((prevState) => ({ ...prevState, isLoading: false }));
    }
  }, []);

  const loginUser = (user, jwt) => {
    saveAuthToLocalStorage(user, jwt);
    setAuthState({ isLoading: false, isAuthenticated: true, user, jwt });
  };

  const logoutUser = () => {
    removeAuthFromLocalStorage();
    setAuthState({ isLoading: false, isAuthenticated: false, user: null, jwt: null });
  };

  return (
    <AuthContext.Provider
      value={{ ...authState, loginUser, logoutUser }}
      {...props}
    />
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthProvider };
