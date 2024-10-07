import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import productReducer from "../features/productSlice";
import userReducer from "../features/userSlice";
import adminReducer from "../features/adminSlice";

const rootReducer = {
  cart: cartReducer,
  product: productReducer,
  user: userReducer,
  admin: adminReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
