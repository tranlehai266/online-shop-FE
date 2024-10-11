import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import productReducer from "../features/productSlice";
import adminReducer from "../features/adminSlice";

const rootReducer = {
  cart: cartReducer,
  product: productReducer,
  admin: adminReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
