// src/utils/auth.js

function isClientSide() {
    return typeof window !== "undefined";
  }

  export const saveAuthToLocalStorage = (user, jwt) => {
    localStorage.setItem("jwt", jwt);
    localStorage.setItem("user", JSON.stringify(user));
  };

  export const removeAuthFromLocalStorage = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user");
  };

  export const getAuthFromLocalStorage = () => {
    if (!isClientSide()) {
      return null;
    }

    const jwt = localStorage.getItem("jwt");
    const user = localStorage.getItem("user");

    if (jwt && user) {
      return { jwt, user: JSON.parse(user) };
    }

    return null;
  };
