// src/actions/authActions.js
import { register, login } from "../utils/api";
import {
  registerSuccess,
  loginSuccess,
  logout,
  setMessage,
  clearMessage,
} from "../store/authSlice";

export const registerUser = (username, email, password) => async (dispatch) => {
  try {
    const response = await register(username, email, password);
    localStorage.setItem("token", response.data.jwt);
    dispatch(loginSuccess(response.data.user));

    dispatch(registerSuccess(response.data.user));


    // Return the user and jwt token
    return { user: response.data.user, jwt: response.data.jwt };
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.error &&
        error.response.data.error.message) ||
      error.message ||
      error.toString();

    dispatch(setMessage(message));

    // Return null in case of an error
    return null;
  }
};



// src/actions/authActions.js
export const loginUser = ({ identifier, password }) => async (dispatch) => {
  try {
    const response = await login(identifier, password);
    localStorage.setItem("token", response.data.jwt);
    dispatch(loginSuccess(response.data.user));
    console.log(response)
    // Return the user and jwt token
    return { user: response.data.user, jwt: response.data.jwt };
  } catch (error) {
    const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();

    dispatch(setMessage(message));

    // Return null in case of an error
    return null;
  }
};



export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(logout());
};

export const clearAuthMessage = () => (dispatch) => {
  dispatch(clearMessage());
};
