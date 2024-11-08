import { createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";
import { getCategory, getProducts } from "./productSlice";

const initialState = {
  users: [],
  isLoading: false,
  error: null,
  carts: [],
  chart: [],
};

const slice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getAllUsersSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.users = action.payload;
    },
    deleteUserSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.users = state.users.filter((user) => user._id !== action.payload);
    },
    getCartByStatusSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.carts = action.payload;
    },
    getChartDataSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.chart = action.payload;
    },
  },
});

export const getAllUsers = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/admin/users");
    dispatch(slice.actions.getAllUsersSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError());
  }
};
export const deleteUser = (userId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    await apiService.delete(`/admin/users/${userId}`);
    dispatch(slice.actions.deleteUserSuccess(userId));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getCartByStatus = (status) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/admin/cart?status=${status}`);
    dispatch(slice.actions.getCartByStatusSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError());
  }
};

export const deleteProduct = (productId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    await apiService.delete(`/admin/product/${productId}`);
    dispatch(getProducts("default"));
  } catch (error) {
    dispatch(slice.actions.hasError());
  }
};

export const deleteCategory = (categoryId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    await apiService.delete(`/admin/category/${categoryId}`);
    dispatch(getCategory());
  } catch (error) {
    dispatch(slice.actions.hasError());
  }
};

export const contactMail =
  ({ email, name, message }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await apiService.post("/admin/contact", {
        email,
        name,
        message,
      });
    } catch (error) {
      dispatch(slice.actions.hasError());
    }
  };

export const getChartData = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/admin/chart");
    dispatch(slice.actions.getChartDataSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export default slice.reducer;
