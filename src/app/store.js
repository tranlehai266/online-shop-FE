import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import productReducer from "../features/productSlice";
import adminReducer from "../features/adminSlice";
import commentReducer from "../features/commentSlice";

const rootReducer = {
  cart: cartReducer,
  product: productReducer,
  admin: adminReducer,
  comment: commentReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
