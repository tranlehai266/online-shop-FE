import { createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  productIds: [],
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addToCartSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
      state.productIds.push(action.payload.product);
    },
  },
});

export const handleAddToCart =
  ({ productId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/cart/items", { productId });
      dispatch(slice.actions.addToCartSuccess(response.data.data.cartItem));
      toast.success("The product has been added to the cart");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export default slice.reducer;
