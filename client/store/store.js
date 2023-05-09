import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import cartSlice from "./cartSlice";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
  cart: cartSlice,
  auth: authSlice,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ['cart'], // Prevents cart from being persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

export default store;
