import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Card, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { LoadingButton } from "@mui/lab";
import FTextField from "../components/form/FTextField";
import FormProvider from "../components/form/FormProvider";
import { updateProfile } from "../features/userSlice";

const UpdateUserSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

function AccountPage() {
  const { user } = useAuth();
  const isLoading = useSelector((state) => state.user.isLoading);
  const defaultValues = {
    name: user?.name || "",
    email: user?.email || "",
    address: user?.address || "",
    contact: user?.contact || "",
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(updateProfile(data));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid2
        container
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
      >
        <Grid2 item xs={12} sm={8} md={6} lg={4}>
          <Card sx={{ p: 4, boxShadow: 3, borderRadius: 2, width: "500px" }}>
            <Typography variant="h5" align="center" sx={{ mb: 3 }}>
              Update Profile
            </Typography>
            <Box display="flex" flexDirection="column" gap={3}>
              <FTextField name="name" label="Name" />
              <FTextField name="email" label="Email" disabled />
              <FTextField name="address" label="Address" />
              <FTextField name="contact" label="Contact" />
            </Box>
            <Box display="flex" justifyContent="center" mt={4}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting || isLoading}
                size="large"
                sx={{ minWidth: "150px" }}
              >
                Save Changes
              </LoadingButton>
            </Box>
          </Card>
        </Grid2>
      </Grid2>
    </FormProvider>
  );
}

export default AccountPage;
