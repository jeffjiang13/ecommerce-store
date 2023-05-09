const isBrowser = () => typeof window !== "undefined";

export const saveAuthToLocalStorage = (user, jwt) => {
  if (!isBrowser()) return;
  localStorage.setItem("auth", JSON.stringify({ user, jwt }));
};

export const getAuthFromLocalStorage = () => {
  if (!isBrowser()) return null;
  const auth = localStorage.getItem("auth");
  if (!auth) return null;
  return JSON.parse(auth);
};

export const removeAuthFromLocalStorage = () => {
  if (!isBrowser()) return;
  localStorage.removeItem("auth");
};
