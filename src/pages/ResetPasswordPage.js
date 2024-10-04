import React from "react";
import { Stack, Alert, Container } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useAuth from "../hooks/useAuth";
import Logo from "../images/logo__shop.png";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const defaultValues = {
  email: "",
};

function ResetPasswordPage() {
  const navigate = useNavigate();
  const auth = useAuth();

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    const { email } = data;
    try {
      await auth.resetPassword({ email }, (message) => {
        navigate("/login");
        toast.success(message);
      });
    } catch (error) {
      reset();
      setError("responseError", { message: error.message });
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backdropFilter: "blur(5px)",
      }}
    >
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} sx={{ width: "400px" }}>
          <img
            src={Logo}
            alt="Logo"
            style={{ maxWidth: "180px", margin: "0 auto 25px auto" }}
          />
          {errors.responseError && (
            <Alert variant="outlined" severity="error">
              {errors.responseError.message}
            </Alert>
          )}
          <FTextField name="email" label="Email" />

          <Stack spacing={1.5}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Submit
            </LoadingButton>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              component={RouterLink}
              to="/login"
            >
              Back To Login
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default ResetPasswordPage;
