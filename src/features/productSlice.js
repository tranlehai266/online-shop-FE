import { createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";
import { cloudinaryUpload } from "../utils/cloudinary";

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
    getCategorySuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.categories = action.payload;
    },
    getProductSearchSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.productSearch = action.payload;
    },
    clearSearchResults(state) {
      state.productSearch = [];
    },
    updateProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const updatedProduct = action.payload;
      state.products = state.products.map((product) =>
        product._id === updatedProduct._id ? updatedProduct : product
      );
    },
    updateCategorySuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      const updatedCategory = action.payload;
      state.categories = state.categories.map((category) =>
        category._id === updatedCategory._id ? updatedCategory : category
      );
    },
    createCategrySuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.categories.push(action.payload);
    },
    createProductSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.products.unshift(action.payload);
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

    dispatch(slice.actions.getProductDetailSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const getProductCategory =
  (categoryId, limit = 20, sort) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.get(
        `/products/category/${categoryId}?limit=${limit}&sort=${sort}`
      );
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

export const updateProduct = (productId, updateData) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    if (updateData.image_url) {
      const imageUrl = await cloudinaryUpload(updateData.image_url);
      updateData.image_url = imageUrl;
    }

    const response = await apiService.put(
      `/admin/product/${productId}`,
      updateData
    );
    dispatch(slice.actions.updateProductSuccess(response.data.data));
    dispatch(getProducts("default"));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const updateCategory = (categoryId, updateData) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    if (updateData.images) {
      const imageUrl = await cloudinaryUpload(updateData.images);
      updateData.images = imageUrl;
    }

    const response = await apiService.put(
      `/admin/category/${categoryId}`,
      updateData
    );
    dispatch(slice.actions.updateCategorySuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const createCategry =
  ({ name, images }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      if (images) {
        const imageUrl = await cloudinaryUpload(images);
        images = imageUrl;
      }

      const response = await apiService.post("/admin/category", {
        name,
        images,
      });
      dispatch(slice.actions.createCategrySuccess(response.data.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const createProduct =
  ({ name, item_id, price, old_price, description, image_url, category }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      if (image_url) {
        const imageUrl = await cloudinaryUpload(image_url);
        image_url = imageUrl;
      }
      const response = await apiService.post("/admin/product", {
        name,
        item_id,
        price,
        old_price,
        description,
        image_url,
        category,
      });
      dispatch(slice.actions.createProductSuccess(response.data.data));
      dispatch(getProducts("default"));
    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export const { clearSearchResults } = slice.actions;
export default slice.reducer;
