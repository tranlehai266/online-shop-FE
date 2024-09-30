import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Card, TextField, Typography } from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { LoadingButton } from "@mui/lab";
import FormProvider from "../components/form/FormProvider";
import { INITIALIZE } from "../contexts/AuthContext";
import apiService from "../app/apiService";

const UpdateUserSchema = yup.object().shape({
  name: yup.string().required("Tên là bắt buộc"),
  address: yup.string(),
  contact: yup.string(),
});

function AccountPage() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [u, setU] = useState(user);

  const handleChange = (event) => {
    setU({ ...u, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    setU(user);
  }, [user]);

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
  });

  const {
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async () => {
    const response = await apiService.put("/users/update", u);
    const updatedUser = response.data.data;
    dispatch({
      type: INITIALIZE,
      payload: { isAuthenticated: true, user: updatedUser },
    });
  };

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Grid2
        container
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
      >
        <Grid2 item xs={12} sm={8} md={6} lg={4}>
          <Card sx={{ p: 4, boxShadow: 3, borderRadius: 2, width: "500px" }}>
            <Typography variant="h5" align="center" sx={{ mb: 3 }}>
              Cập nhật hồ sơ
            </Typography>
            <Box display="flex" flexDirection="column" gap={3}>
              <TextField
                name="name"
                label="Tên của bạn"
                value={u?.name}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                error={!!errors.name}
                helperText={errors.name?.message}
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              />
              <TextField
                name="email"
                label="Email của bạn"
                value={u?.email}
                onChange={handleChange}
                variant="outlined"
                disabled
                fullWidth
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              />
              <TextField
                name="address"
                label="Địa chỉ"
                value={u?.address}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              />
              <TextField
                name="contact"
                label="Số điện thoại"
                value={u?.contact}
                onChange={handleChange}
                variant="outlined"
                fullWidth
                slotProps={{
                  inputLabel: { shrink: true },
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
                Lưu thay đổi
              </LoadingButton>
            </Box>
          </Card>
        </Grid2>
      </Grid2>
    </FormProvider>
  );
}

export default AccountPage;
