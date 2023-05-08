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
        console.log("registerUser action called"); // Add this line

      const response = await register(username, email, password);
      console.log("Response:", response); // Add this line
      dispatch(registerSuccess());
      dispatch(setMessage(response.data.message));
    } catch (error) {
      console.log("Error:", error); // Add this line

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(setMessage(message));
    }
  };


// src/actions/authActions.js
export const loginUser = ({ identifier, password }) => async (dispatch) => {
    try {
      const response = await login(identifier, password);
      localStorage.setItem("token", response.data.jwt);
      dispatch(loginSuccess(response.data.user));
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch(setMessage(message));
    }
  };


export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(logout());
};

export const clearAuthMessage = () => (dispatch) => {
  dispatch(clearMessage());
};
