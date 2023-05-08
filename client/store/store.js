import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import authSlice from "./authSlice"; // Import the auth slice

export default configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice, // Add the auth slice to the reducer
  },
});
