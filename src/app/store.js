import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import productReducer from "../features/productSlice";
import userReducer from "../features/userSlice";

const rootReducer = {
  cart: cartReducer,
  product: productReducer,
  user: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
