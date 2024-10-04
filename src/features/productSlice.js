import { createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";

const initialState = {
  products: [],
  productDetail: null,
  productCategory: [],
  productSearch: [],
  categories: [],
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
      console.log("product 28", state.products);
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
      console.log("39", state.productCategory);
    },
    getCategorySuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.categories = action.payload;
      console.log("43", state.categories);
    },
    getProductSearchSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.productSearch = action.payload;
      console.log(state.productSearch);
    },
    clearSearchResults(state) {
      state.productSearch = [];
    },
  },
});

export const getProducts =
  (sort, searchQuery = "", limit) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(
        `/products?&sort=${sort}&limit=${limit}&search=${searchQuery}`
      );
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

export const getProductCategory =
  (categoryId, limit = 20, sort = "default") =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(
        `/products/category/${categoryId}?limit=${limit}&sort=${sort}`
      );
      console.log("product category", response);
      dispatch(slice.actions.getProductCategorySuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError());
    }
  };

export const getCategory = () => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get("/categories");
    dispatch(slice.actions.getCategorySuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError());
  }
};

export const getSearchProduct = (searchQuery) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/products?search=${searchQuery}`);
    dispatch(slice.actions.getProductSearchSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError());
  }
};
export const { clearSearchResults } = slice.actions;
export default slice.reducer;
