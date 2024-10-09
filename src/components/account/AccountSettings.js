import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Card, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { FTextField, FormProvider } from "../form";

const UpdateUserSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  contact: yup.string().required("Contact is required"),
  password: yup
    .string()
    .nullable()
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .nullable()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

function AccountSettings() {
  const { user, updateProfile } = useAuth();

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
    reset,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (user) {
      reset({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        contact: user.contact || "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    await updateProfile(data, () => {
      toast.success("update profile success");
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid2
        container
        justifyContent="center"
        alignItems="center"
        minHeight="50vh"
      >
        <Grid2 item="true" xs={12} sm={8} md={6} lg={4}>
          <Card
            sx={{
              p: 4,
              boxShadow: 3,
              borderRadius: 2,
              width: { md: "500px", xs: "400px" },
            }}
          >
            <Typography variant="h5" align="center" sx={{ mb: 3 }}>
              Update Profile
            </Typography>
            <Box display="flex" flexDirection="column" gap={3}>
              <FTextField name="name" label="Your name" />
              <FTextField name="email" label="Your Email" disabled />
              <FTextField name="address" label="Your address" />
              <FTextField name="contact" label="Your contact" />
            </Box>
            <Box display="flex" justifyContent="center" mt={4}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isSubmitting}
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

export default AccountSettings;
