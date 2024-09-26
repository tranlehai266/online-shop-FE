import React, { useState } from "react";
import {
  Stack,
  Alert,
  IconButton,
  InputAdornment,
  Container,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { FormProvider, FTextField } from "../components/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import useAuth from "../hooks/useAuth";
import Logo from "../images/logo__shop.png";

const LoginSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  passwordConfirm: Yup.string()
    .required("Please confirm your password")
    .oneOf([Yup.ref("password")], "Password must match"),
});

const defaultValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

function RegisterPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = async (data) => {
    let { name, email, password } = data;
    try {
      await auth.register({ name, email, password }, (message) => {
        alert(message);
        navigate("/confirm-email");
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
        height: "500px",
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
          <FTextField name="name" label="Name" />

          <FTextField name="email" label="Email address" />

          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FTextField
            name="passwordConfirm"
            label="Confirm Password"
            type={showPasswordConfirm ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    edge="end"
                  >
                    {showPasswordConfirm ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Stack spacing={1.5}>
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Register
            </LoadingButton>

            <LoadingButton
              fullWidth
              size="large"
              type="button"
              variant="contained"
              component={RouterLink}
              to="/login"
            >
              Already has an account
            </LoadingButton>
          </Stack>
        </Stack>
      </FormProvider>
    </Container>
  );
}

export default RegisterPage;
