// src/actions/authActions.js
import { register, login } from "../utils/api";
import {
  registerSuccess,
  loginSuccess,
  logout,
  setMessage,
  clearMessage,
  setUser,
} from "../store/authSlice";
import axios from 'axios';

// src/actions/authActions.js
export const registerUser = (username, email, password) => async (dispatch) => {
  try {
    const response = await register(username, email, password);
    localStorage.setItem("token", response.data.jwt);
    dispatch(loginSuccess(response.data.user));

    dispatch(registerSuccess(response.data.user));

    // Return the user and jwt token
    return { user: response.data.user, jwt: response.data.jwt };
  } catch (error) {
    console.error("Error:", error.response); // Add this line to log the error response

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

    // Fetch user data after login
    const userResponse = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/${response.data.user.id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log('userResponse.data:', userResponse.data); // Add this line to log the user data

    // Add this line to include the profileImage in the setUser dispatch call
    const updatedUser = { ...userResponse.data, profileImage: response.data.user.profileImage };
    dispatch(setUser(updatedUser));

    // Return the user and jwt token
    return { user: updatedUser, jwt: response.data.jwt };
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





export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(logout());
};

export const clearAuthMessage = () => (dispatch) => {
  dispatch(clearMessage());
};
