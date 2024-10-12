import { createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";

const initialState = {
  comments: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getCommentsSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.comments = action.payload;
    },
    addCommentSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.comments.push(action.payload);
    },
  },
});

export const getComments = (productId) => async (dispatch) => {
  dispatch(slice.actions.startLoading());
  try {
    const response = await apiService.get(`/comment/comments/${productId}`);
    dispatch(slice.actions.getCommentsSuccess(response.data.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error.message));
  }
};

export const addComment =
  ({ productId, content }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await apiService.post("/comment/comments", {
        productId,
        content,
      });
      dispatch(slice.actions.addCommentSuccess(response.data.data));

    } catch (error) {
      dispatch(slice.actions.hasError(error.message));
    }
  };

export default slice.reducer;
