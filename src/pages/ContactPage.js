import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Stack, Typography, Box } from "@mui/material";
import { FTextField, FormProvider } from "../components/form";
import Grid from "@mui/material/Grid2";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { contactMail } from "../features/adminSlice";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const ContactSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().required("Email is required"),
  message: yup.string().required("Message is required"),
});

function ContactPage() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    name: "",
    email: "",
    message: "",
  };

  const methods = useForm({
    resolver: yupResolver(ContactSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      dispatch(contactMail(data));
      reset();
      setLoading(false);
      toast.success("Send Success");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Grid
      container
      spacing={4}
      sx={{ padding: "50px" }}
      justifyContent="center"
    >
      <Grid size={{ xs: 12, sm: 4, md: 4 }}>
        <Box>
          <Typography variant="h4">Contact Details</Typography>
          <Typography variant="body1" sx={{ marginTop: "20px" }}>
            There’s no place like home. To help you make yours perfect, our
            stores are open, we’re delivering as normal, our online store is
            available 24/7, and our customer service team is ready to help you
            via phone and Live Chat.
          </Typography>
          <Stack direction="column" spacing={4} sx={{ marginTop: "30px" }}>
            <Box display="flex" alignItems="center">
              <LocationOnIcon color="primary" sx={{ fontSize: "35px" }} />
              <Box ml="10px">
                <Typography fontWeight="bold">Adress</Typography>
                <Typography variant="body1" sx={{ opacity: "0.6" }}>
                  807 Mize Cemetery Rd, Somerset KY, 42503
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <PhoneIcon color="primary" sx={{ fontSize: "35px" }} />
              <Box ml="10px">
                <Typography fontWeight="bold">Phone</Typography>
                <Typography variant="body1" sx={{ opacity: "0.6" }}>
                  +38 266215121
                </Typography>
              </Box>
            </Box>
            <Box display="flex" alignItems="center">
              <EmailIcon color="primary" sx={{ fontSize: "35px" }} />
              <Box ml="10px">
                <Typography fontWeight="bold">Email</Typography>
                <Typography variant="body1" sx={{ opacity: "0.6" }}>
                  sayhello@funio.com
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Grid>

      <Grid size={{ xs: 12, sm: 4, md: 6 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ContactMailIcon sx={{ fontSize: "80px" }} />
          <Typography variant="h4" gutterBottom textAlign="center">
            Send us a message
          </Typography>
        </Box>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <FTextField name="name" label="Your Name" />
            <FTextField name="email" label="Your Email" />
            <FTextField name="message" label="Message" multiline rows={4} />
            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={loading}
            >
              Send
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Grid>
    </Grid>
  );
}

export default ContactPage;
