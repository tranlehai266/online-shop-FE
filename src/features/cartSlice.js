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
    getCartSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload.items;
      state.productIds = action.payload.items.map(item => item.product._id);
    },
    deleteCartSuccess(state,action){

    }
  },
});

export const handleAddToCart =
  ({ productId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/cart/items", { productId });
      dispatch(slice.actions.addToCartSuccess(response.data.data.cartItem));
      dispatch(getCart())
      toast.success("The product has been added to the cart");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

  export const getCart = () => async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get("/shoppingcart");
      dispatch(slice.actions.getCartSuccess(response.data.data));
      console.log("shoppingcart",response.data.data)
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

  export const deleteCart = ({ cartItemId }) => async(dispatch) => {
    dispatch(slice.actions.startLoading())
    try {
      const response = await apiService.delete("/cart/items", {cartItemId})
      dispatch(slice.actions.deleteCartSuccess(response.data.data))
      dispatch(getCart())
    } catch (error) {
      dispatch(slice.actions.hasError(error.message))
    }
  }

export default slice.reducer;
