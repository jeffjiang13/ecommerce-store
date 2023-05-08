// src/reducers/authReducer.js
import { REGISTER_SUCCESS, LOGIN_SUCCESS, LOGOUT, SET_MESSAGE, CLEAR_MESSAGE } from "../actions/authActions";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

  // src/reducers/authReducer.js (continuation)
  export const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
      case REGISTER_SUCCESS:
        return {
          ...state,
          isLoggedIn: false,
        };
      case LOGIN_SUCCESS:
        return {
          ...state,
          isLoggedIn: true,
          user: payload,
        };
      case LOGOUT:
        return {
          ...state,
          isLoggedIn: false,
          user: null,
        };
      case SET_MESSAGE:
        return {
          ...state,
          message: payload,
        };
      case CLEAR_MESSAGE:
        return {
          ...state,
          message: "",
        };
      default:
        return state;
    }
  };
