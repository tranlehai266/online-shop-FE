import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Card,
  Typography,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import useAuth from "../../hooks/useAuth";
import { FTextField, FormProvider } from "../form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const UpdateUserSchema = yup.object().shape({
  password: yup
    .string()
    .nullable()
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: yup
    .string()
    .nullable()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

function AccountPassword() {
  const { user, updateProfile } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = {
    newPassword: "",
    confirmPassword: "",
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
        password: user.password || "",
        confirmPassword: "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    console.log("60", data);
    await updateProfile({ password: data.password }, () => {
      toast.success("Change Password Success");
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
        <Grid2 item xs={12} sm={8} md={6} lg={4}>
          <Card
            sx={{
              p: 4,
              boxShadow: 3,
              borderRadius: 2,
              width: { md: "500px", xs: "400px" },
            }}
          >
            <Typography variant="h5" align="center" sx={{ mb: 3 }}>
              Change Password
            </Typography>
            <Box display="flex" flexDirection="column" gap={3}>
              <FTextField
                name="password"
                label="New Password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}{" "}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FTextField
                name="confirmPassword"
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}{" "}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
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

export default AccountPassword;
