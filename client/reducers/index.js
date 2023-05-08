  // src/reducers/index.js
  import { combineReducers } from "redux";
  import { productsReducer } from "./productsReducer";
  import { cartReducer } from "./cartReducer";
  import { authReducer } from "./authReducer";

  export const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    auth: authReducer,
  });
