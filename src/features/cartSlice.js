import { createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
  productIds: [],
  itemsStatus: [],
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
      state.productIds = action.payload.items.map((item) => item.product._id);
      console.log("34", state.items);
    },
    updateQuantitySuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload.items;
    },
    deleteCartSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const itemId = action.payload;
      state.items = state.items.filter((item) => item._id !== itemId);
    },
    completePaymentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    getShoppingStatusSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.itemsStatus = action.payload;
      console.log("57", state.itemsStatus);
    },
  },
});

export const handleAddToCart =
  ({ productId, quantity, userId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/cart/items", {
        productId,
        quantity,
        userId,
      });
      console.log(response);
      dispatch(slice.actions.addToCartSuccess(response.data.data.cartItem));
      dispatch(getCart());
      toast.success("The product has been added to the cart");
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getCart = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/shoppingcart");
    console.log("shoppingcart", response.data.data);
    dispatch(slice.actions.getCartSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const updateQuantity =
  ({ cartItemId, quantity }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      console.log("Updating quantities with:", cartItemId, quantity);
      const response = await apiService.put("/cart/items", {
        cartItemId,
        quantity,
      });
      // console.log("updatequantity", response);
      dispatch(slice.actions.updateQuantitySuccess(response.data.data));
      dispatch(getCart());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deleteCart =
  ({ cartItemId }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.delete("/cart/items", {
        data: { cartItemId },
      });

      dispatch(slice.actions.deleteCartSuccess(response.data.data._id));
      dispatch(getCart());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const completePayment =
  ({ orderID }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.put("/shoppingcart/payment", {
        orderID,
      });
      console.log("payment", response);
      dispatch(slice.actions.completePaymentSuccess(response.data.data));
      dispatch(getCart());
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const getShoppingStatus = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/shoppingcart/shopping`);
    dispatch(slice.actions.getShoppingStatusSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export default slice.reducer;
