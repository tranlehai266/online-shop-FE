import { createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";

const initialState = {
  products: [],
  productDetail: null,
  productCategory: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.products = action.payload;
    },
    getProductDetailSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.productDetail = action.payload;
    },
    getProductCategorySuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.productCategory = action.payload;
    },
  },
});

export const getProducts =
  (limit = 10) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(`/products?limit=${limit}`);
      dispatch(slice.actions.getProductSuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError());
    }
  };

export const getProductDetail = (productId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/products/product/${productId}`);
    console.log("detail", response);
    dispatch(slice.actions.getProductDetailSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getProductCategory = (categoryId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/products/category/${categoryId}`);
    console.log("product category", response);
    dispatch(slice.actions.getProductCategorySuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError());
  }
};

export default slice.reducer;
