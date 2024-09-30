import { createSlice } from "@reduxjs/toolkit";
import apiService from "../app/apiService";
import { toast } from "react-toastify";

const initialState = {
  updateProfile: [],
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateUserProfileSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.updateProfile = action.payload;
    },
  },
});

export const updateProfile =
  ({ name, email, password, address, contact }) =>
  async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = { name, email, password, address, contact };
      const response = await apiService.put("/users/update", data);
      dispatch(slice.actions.updateUserProfileSuccess(response.data));
      toast.success("Update Profile Success");
    } catch (error) {
      dispatch(slice.actions.hasError());
    }
  };

export default slice.reducer;
