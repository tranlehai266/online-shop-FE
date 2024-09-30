// import { createSlice } from "@reduxjs/toolkit";
// import apiService from "../app/apiService";
// import { toast } from "react-toastify";
// import useAuth from "../hooks/useAuth";

// const initialState = {
//   isLoading: false,
//   error: null,
// };

// const slice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     startLoading(state) {
//       state.isLoading = true;
//     },
//     hasError(state, action) {
//       state.isLoading = false;
//       state.error = action.payload;
//     },
//     updateUserProfileSuccess(state, action) {
//       state.isLoading = false;
//       state.error = null;
//       state.updatedProfile = action.payload;
//       console.log("26",state.updatedProfile)
//     },
//   },
// });

// export const updateProfile =
//   ({ name, email, password, address, contact }) =>
//   async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const auth = useAuth()
//       const { user } = auth()
//       const data = { name, email, password, address, contact };
//       const response = await apiService.put("/users/update", data);
//       console.log("update", response);
//       // dispatch(slice.actions.updateUserProfileSuccess(response.data.data));
      
//       toast.success("Update Profile Success");
//     } catch (error) {
//       dispatch(slice.actions.hasError());
//     }
//   };

// export default slice.reducer;
