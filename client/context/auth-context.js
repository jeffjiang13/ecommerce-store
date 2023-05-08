import React, { createContext, useState, useEffect, useContext } from "react";
import {
  saveAuthToLocalStorage,
  removeAuthFromLocalStorage,
  getAuthFromLocalStorage,
} from "../utils/auth";

// create an authentication context
const AuthContext = createContext();

// define a provider component for the authentication context
const AuthProvider = (props) => {
  const [authState, setAuthState] = useState(() => {
    let token, user;
    try {
      if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
        user = JSON.parse(localStorage.getItem('user'));
      }
    } catch (err) {
      console.error(err);
    }
    return { isAuthenticated: token ? true : false, user, jwt: token };
  });

  // define a function for logging in a user
  const loginUser = (user, jwt) => {
    saveAuthToLocalStorage(user, jwt);
    setAuthState({ isAuthenticated: true, user, jwt });
  };

  // define a function for logging out a user
  const logoutUser = () => {
    removeAuthFromLocalStorage();
    setAuthState({ isAuthenticated: false, user: null, jwt: null });
  };

  // provide the authentication state and login/logout functions to the context provider
  return (
    <AuthContext.Provider
      value={{ ...authState, loginUser, logoutUser }}
      {...props}
    />
  );
};

// define a hook for accessing the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};

// export the authentication context and provider
export { AuthContext, AuthProvider };
