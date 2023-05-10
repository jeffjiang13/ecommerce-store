// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null, // Add this line to store the token

  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      if (action.payload && action.payload.profileImage) {
        state.user.profileImage = action.payload.profileImage;
      }
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    registerSuccess: (state) => {
      state.isLoggedIn = true;
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = "";
    },
  },
});

export const {
  setToken,

  registerSuccess,
  loginSuccess,
  logout,
  setMessage,
  clearMessage,
  updateUser,
  setUser,
} = authSlice.actions;

export default authSlice.reducer;
